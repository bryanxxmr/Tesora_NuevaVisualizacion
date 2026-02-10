#!/usr/bin/env node

import Anthropic from "@anthropic-sdk/sdk";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";
import { Client } from "@modelcontextprotocol/sdk/client/index";
import { ResourceTemplate, Tool } from "@modelcontextprotocol/sdk/types";

const client = new Anthropic();

interface TextContent {
    type: "text";
    text: string;
}

interface ToolUseBlock {
    type: "tool_use";
    id: string;
    name: string;
    input: Record<string, unknown>;
}

const tools: Tool[] = [
    {
        name: "launch_browser",
        description: "Lanza una instancia de navegador de Playwright",
        inputSchema: {
            type: "object",
            properties: {
                browser_type: {
                    type: "string",
                    enum: ["chromium", "firefox", "webkit"],
                    description: "Tipo de navegador a lanzar",
                },
                headless: {
                    type: "boolean",
                    description: "Ejecutar en modo headless (sin interfaz gráfica)",
                    default: true,
                },
            },
            required: ["browser_type"],
        },
    },
    {
        name: "goto",
        description: "Navega a una URL específica",
        inputSchema: {
            type: "object",
            properties: {
                url: {
                    type: "string",
                    description: "URL a la que navegar",
                },
                wait_until: {
                    type: "string",
                    enum: ["load", "domcontentloaded", "networkidle"],
                    description: "Esperar hasta que se complete el evento especificado",
                },
            },
            required: ["url"],
        },
    },
    {
        name: "click",
        description: "Hace clic en un elemento",
        inputSchema: {
            type: "object",
            properties: {
                selector: {
                    type: "string",
                    description: "Selector CSS del elemento a hacer clic",
                },
                button: {
                    type: "string",
                    enum: ["left", "right", "middle"],
                    description: "Botón del ratón a usar",
                    default: "left",
                },
            },
            required: ["selector"],
        },
    },
    {
        name: "fill",
        description: "Rellena un campo de texto",
        inputSchema: {
            type: "object",
            properties: {
                selector: {
                    type: "string",
                    description: "Selector CSS del campo de texto",
                },
                text: {
                    type: "string",
                    description: "Texto a ingresar",
                },
            },
            required: ["selector", "text"],
        },
    },
    {
        name: "screenshot",
        description: "Toma una captura de pantalla de la página actual",
        inputSchema: {
            type: "object",
            properties: {
                filename: {
                    type: "string",
                    description: "Nombre del archivo para la captura",
                },
                full_page: {
                    type: "boolean",
                    description: "Capturar la página completa",
                    default: false,
                },
            },
            required: ["filename"],
        },
    },
    {
        name: "get_text",
        description: "Obtiene el texto de un elemento",
        inputSchema: {
            type: "object",
            properties: {
                selector: {
                    type: "string",
                    description: "Selector CSS del elemento",
                },
            },
            required: ["selector"],
        },
    },
    {
        name: "wait_for_selector",
        description: "Espera a que un elemento esté presente en la página",
        inputSchema: {
            type: "object",
            properties: {
                selector: {
                    type: "string",
                    description: "Selector CSS del elemento a esperar",
                },
                timeout: {
                    type: "number",
                    description: "Tiempo máximo en milisegundos a esperar",
                    default: 30000,
                },
            },
            required: ["selector"],
        },
    },
    {
        name: "expect_text",
        description: "Valida que un elemento contenga un texto específico",
        inputSchema: {
            type: "object",
            properties: {
                selector: {
                    type: "string",
                    description: "Selector CSS del elemento",
                },
                text: {
                    type: "string",
                    description: "Texto esperado",
                },
            },
            required: ["selector", "text"],
        },
    },
];

async function main() {
    console.log("🎭 Servidor MCP de Playwright iniciado...");
    console.log("Herramientas disponibles:", tools.length);

    const conversationHistory: Array<{
        role: "user" | "assistant";
        content: string | TextContent[] | ToolUseBlock[];
    }> = [];

    // Ejemplo de conversación con el usuario
    const userMessage =
        "Hola, quiero automatizar un test que verifique que la página de Google carga correctamente.";

    console.log("\n📝 Usuario:", userMessage);

    conversationHistory.push({
        role: "user",
        content: userMessage,
    });

    const response = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2048,
        tools: tools as any,
        messages: conversationHistory as any,
        system: `Eres un experto en QA Automation con Playwright. 
Ayudas a los usuarios a automatizar pruebas de aplicaciones web.
Tienes acceso a herramientas de Playwright para navegar, hacer clic, rellenar campos, tomar capturas y validar elementos.
Proporciona soluciones paso a paso y explica cada acción que realiza.
Responde siempre en español.`,
    });

    console.log("\n🤖 Asistente:");
    for (const block of response.content) {
        if (block.type === "text") {
            console.log(block.text);
        } else if (block.type === "tool_use") {
            console.log(`\n🛠️  Usando herramienta: ${block.name}`);
            console.log("Parámetros:", JSON.stringify(block.input, null, 2));
        }
    }

    console.log(
        "\n✅ Servidor MCP de Playwright listo para recibir comandos de automatización"
    );
    console.log("Las herramientas están disponibles para automatizar pruebas web.");
}

main().catch(console.error);
