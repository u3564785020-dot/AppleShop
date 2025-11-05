# Backend Deployment Guide

## Структура Backend

Backend находится в папке `backend/` и содержит:

- **Express.js** сервер с REST API
- **MongoDB** для хранения данных клиентов
- Автоматическое определение страны по IP
- Синхронизация данных с фронтендом

## Локальная установка

```bash
cd backend
npm install
```

Создайте файл `.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/appleshop
FRONTEND_URL=http://localhost:3000
```

Запустите:
```bash
npm run dev
```

## Деплой на Railway

### Шаг 1: Подготовка проекта

1. Убедитесь, что backend находится в папке `backend/`
2. Файлы должны быть закоммичены в Git

### Шаг 2: Создание проекта на Railway

1. Зайдите на [Railway](https://railway.com)
2. Нажмите "New Project"
3. Выберите "Deploy from GitHub repo" (или используйте Railway CLI)

### Шаг 3: Настройка MongoDB

**Вариант А: MongoDB от Railway (рекомендуется)**

1. В проекте Railway нажмите "+ New"
2. Выберите "Database" → "MongoDB"
3. Railway автоматически создаст переменную `MONGO_URL`
4. Backend автоматически использует её

**Вариант Б: Внешний MongoDB (MongoDB Atlas)**

1. Создайте кластер на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Получите connection string
3. В Railway добавьте переменную окружения:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster.mongodb.net/appleshop`

### Шаг 4: Настройка переменных окружения

В настройках сервиса Railway добавьте:

- `MONGODB_URI` или `MONGO_URL` - строка подключения к MongoDB (Railway создаст автоматически если используете их MongoDB)
- `FRONTEND_URL` - URL вашего фронтенда (например: `https://your-frontend.railway.app`)
- `PORT` - Railway установит автоматически, не нужно настраивать

### Шаг 5: Настройка Root Directory

Важно! Если ваш проект в подпапке:

1. В настройках сервиса найдите "Root Directory"
2. Установите: `backend`
3. Это скажет Railway где находится ваш backend код

### Шаг 6: Build Settings

Railway автоматически определит Node.js проект, но можно настроить вручную:

- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Шаг 7: Деплой

1. Railway автоматически деплоит при каждом push в GitHub
2. Или нажмите "Deploy" вручную
3. Дождитесь завершения деплоя

### Шаг 8: Получение URL

После деплоя Railway даст вам URL типа:
`https://your-backend.up.railway.app`

## Интеграция с фронтендом

Обновите `.env` файл фронтенда (или переменные окружения):

```env
REACT_APP_API_URL=https://your-backend.up.railway.app/api
```

Или создайте файл `ts/.env`:
```env
REACT_APP_API_URL=https://your-backend.up.railway.app/api
```

## API Endpoints

После деплоя доступны:

- `GET /health` - Проверка работоспособности
- `POST /api/user` - Создать/получить пользователя
- `GET /api/user/:clientId` - Получить данные пользователя
- `POST /api/user/cart` - Обновить корзину
- `POST /api/user/checkout` - Сохранить checkout данные
- `GET /api/users` - Получить всех пользователей (admin)

## Проверка работы

1. Откройте URL вашего backend: `https://your-backend.up.railway.app`
2. Должно отображаться JSON с информацией об API
3. Проверьте `/health` endpoint
4. Откройте фронтенд и добавьте товар в корзину - данные должны сохраниться в MongoDB

## Troubleshooting

### Backend не запускается

1. Проверьте логи в Railway
2. Убедитесь, что `MONGODB_URI` или `MONGO_URL` установлен
3. Проверьте, что Root Directory установлен в `backend`

### MongoDB connection error

1. Проверьте connection string
2. Убедитесь, что IP адрес Railway добавлен в whitelist MongoDB Atlas (если используете Atlas)
3. Проверьте username/password

### Frontend не может подключиться

1. Убедитесь, что `REACT_APP_API_URL` установлен правильно
2. Проверьте CORS настройки в backend
3. Убедитесь, что `FRONTEND_URL` в backend указывает на правильный домен фронтенда

## Мониторинг

Railway предоставляет:
- Логи в реальном времени
- Метрики использования
- Мониторинг здоровья сервиса

## Дополнительно

- Используйте Railway MongoDB для простоты
- Настройте кастомный домен если нужно
- Используйте Railway Secrets для безопасного хранения переменных
