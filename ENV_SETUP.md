# 🔧 Настройка переменных окружения

## Backend (Railway Variables)

В настройках **Backend** сервиса в Railway добавьте:

```
MONGODB_URI=<ваш_MONGO_URL_от_Railway>
FRONTEND_URL=https://your-frontend.up.railway.app
NODE_ENV=production
```

**Примечание:** Если вы используете MongoDB от Railway, переменная `MONGO_URL` создастся автоматически и будет доступна для backend.

## Frontend (Railway Variables)

В настройках **Frontend** сервиса в Railway добавьте:

```
REACT_APP_API_URL=https://your-backend.up.railway.app/api
NODE_ENV=production
```

**Важно:** Замените `your-backend.up.railway.app` на реальный URL вашего backend сервиса из Railway.

## Локальная разработка

Для локальной разработки создайте файл `.env` в корне проекта `ts/`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

И в папке `backend/` создайте `.env`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/appleshop
FRONTEND_URL=http://localhost:3000
```

## Проверка переменных

После настройки переменных окружения:

1. **Backend**: Проверьте логи - должны увидеть "MongoDB Connected"
2. **Frontend**: Откройте консоль браузера (F12) и проверьте, что запросы идут на правильный API URL
