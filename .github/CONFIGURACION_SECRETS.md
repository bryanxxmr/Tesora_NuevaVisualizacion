# 🔐 Configuración de Secretos para GitHub Actions

## Cómo Configurar Slack Notifications

### 1. Crear Webhook en Slack

1. Ve a [Slack API Apps](https://api.slack.com/apps)
2. Click en **Create New App** → **From scratch**
3. Nombre de la app: `Playwright CI` 
4. Workspace: Selecciona tu workspace
5. En el menú izquierdo: **Incoming Webhooks** → Enable
6. Click en **Add New Webhook to Workspace**
7. Selecciona el canal (ej: `#ci-notifications`)
8. Copia la URL del webhook (empieza con `https://hooks.slack.com/...`)

### 2. Agregar Webhook a GitHub

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Nombre: `SLACK_WEBHOOK_URL`
5. Valor: Pega la URL del webhook de Slack
6. Click en **Add secret**

### 3. Listo 🎉

Ahora recibirás notificaciones en Slack cuando:
- ✅ Los tests pasen
- ❌ Los tests fallen
- 📅 Se ejecuten las pruebas programadas

---

## Otros Secretos Útiles (Opcional)

### Para Integración con APIs Externas

Si tus tests usan APIs, puedes añadir:

```bash
# En GitHub → Settings → Secrets and variables → Actions
BASE_URL = https://staging.example.com
API_TOKEN = tuapitoken
DATABASE_URL = postgresql://...
```

Úsalos en el workflow:
```yaml
env:
  BASE_URL: ${{ secrets.BASE_URL }}
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

### Para Integración con Reportes (Allure, etc)

```bash
ALLURE_TOKEN = token_para_allure
REPORTPORTAL_API_URL = url_reportportal
```

---

## 📊 Monitoreo de Notificaciones

### Ver Notificaciones en Slack
- Cada push a `main` o `develop` dispara el workflow
- Cada PR abierto ejecuta los tests
- Cada día a las 2 AM UTC se ejecutan automáticamente

### Personalizar Notificaciones
Si quieres cambiar:
- **Canales**: Crea múltiples webhooks para diferentes canales
- **Frecuencia**: Edita el `cron` en `.github/workflows/playwright.yml`
- **Mensaje**: Edita el `payload` en la sección "Notify Slack"

---

## 🔑 Checklist de Configuración

- [ ] He creado una app en Slack API
- [ ] Tengo el webhook URL de Slack
- [ ] He añadido `SLACK_WEBHOOK_URL` en GitHub Secrets
- [ ] El workflow se ejecutó al menos una vez
- [ ] Recibí la notificación en Slack

---

## ❓ Troubleshooting

### No recibo notificaciones en Slack
**Solución:**
```bash
# Verificar que el secret está bien configurado
# Ve a: Settings → Secrets → Revisa SLACK_WEBHOOK_URL
# Verifica que NO tenga espacios o caracteres extra
```

### El webhook dice "invalid"
**Solución:**
1. Copia el URL directamente desde Slack (no desde otro lugar)
2. Verifica que el URL empieza con `https://hooks.slack.com`
3. Regenera el webhook en Slack si es muy antiguo

### Las notificaciones llegan pero con errores
**Solución:**
1. Revisa los logs del workflow en GitHub Actions
2. Busca errores en la sección "Notify Slack"
3. Verifica que el canal exista y que el bot tenga permisos

---

## 📞 Soporte

Para más información:
- [Documentación de Slack GitHub Action](https://github.com/slackapi/slack-github-action)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [GitHub Actions Documentation](https://docs.github.com/actions)
