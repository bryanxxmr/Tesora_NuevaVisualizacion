// Sistema de logging para QA Automation
import fs from 'fs';
import path from 'path';
import { config } from './config.js';

const LOG_DIR = config.logging.logPath;
const LOG_LEVEL = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

// Crear directorio de logs si no existe
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const getCurrentLevelValue = () => {
    return LOG_LEVEL[config.logging.level as keyof typeof LOG_LEVEL] || 1;
};

const formatMessage = (level: string, message: string): string => {
    const timestamp = config.logging.timestamp ? new Date().toISOString() + ' ' : '';
    return `${timestamp}[${level.toUpperCase()}] ${message}`;
};

const writeToFile = (message: string, level: string) => {
    if (config.logging.fileLog) {
        const logFile = path.join(LOG_DIR, `${new Date().toISOString().split('T')[0]}.log`);
        const content = formatMessage(level, message) + '\n';
        fs.appendFileSync(logFile, content);
    }
};

export const logger = {
    debug: (message: string) => {
        if (getCurrentLevelValue() <= LOG_LEVEL.debug) {
            const formatted = formatMessage('debug', message);
            console.log('🔍', formatted);
            writeToFile(message, 'debug');
        }
    },

    info: (message: string) => {
        if (getCurrentLevelValue() <= LOG_LEVEL.info) {
            const formatted = formatMessage('info', message);
            console.log('ℹ️ ', formatted);
            writeToFile(message, 'info');
        }
    },

    warn: (message: string) => {
        if (getCurrentLevelValue() <= LOG_LEVEL.warn) {
            const formatted = formatMessage('warn', message);
            console.warn('⚠️ ', formatted);
            writeToFile(message, 'warn');
        }
    },

    error: (message: string) => {
        const formatted = formatMessage('error', message);
        console.error('❌', formatted);
        writeToFile(message, 'error');
    },

    success: (message: string) => {
        const formatted = formatMessage('success', message);
        console.log('✅', formatted);
        writeToFile(message, 'success');
    },
};

export default logger;
