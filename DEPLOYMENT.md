# 🚀 Railway Deployment Guide

## Автоматический деплой на Railway

Этот проект настроен для автоматического деплоя на Railway с MongoDB.

## Шаг 1: Подготовка GitHub

1. Убедитесь, что все файлы закоммичены:
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push
```

## Шаг 2: Создание проекта на Railway

1. Зайдите на [Railway](https://railway.com)
2. Нажмите **"New Project"**
3. Выберите **"Deploy from GitHub repo"**
4. Выберите ваш репозиторий

## Шаг 3: Деплой Backend

1. В проекте Railway нажмите **"+ New"**
2. Выберите **"GitHub Repo"** снова
3. Выберите тот же репозиторий

### Настройка Backend сервиса:

1. **Settings** → **Root Directory**: установите `backend`
2. **Variables** добавьте:
   - `MONGODB_URI` или `MONGO_URL` (Railway автоматически создаст если вы добавили MongoDB)
   - `FRONTEND_URL` = URL вашего фронтенда (после деплоя)
   - `NODE_ENV` = `production`

3. Railway автоматически:
   - Определит Node.js проект
   - Установит зависимости (`npm install`)
   - Запустит сервер (`npm start`)

4. После деплоя скопируйте **Public URL** backend (например: `https://your-backend.up.railway.app`)

## Шаг 4: Добавление MongoDB

Если вы еще не добавили MongoDB:

1. В проекте Railway нажмите **"+ New"**
2. Выберите **"Database"** → **"MongoDB"**
3. Railway автоматически создаст переменную `MONGO_URL`
4. Backend автоматически подключится

## Шаг 5: Деплой Frontend

1. В проекте Railway нажмите **"+ New"**
2. Выберите **"GitHub Repo"**
3. Выберите тот же репозиторий

### Настройка Frontend сервиса:

1. **Settings** → **Root Directory**: оставьте пустым (корень репозитория)
2. **Variables** добавьте:
   - `REACT_APP_API_URL` = `https://your-backend.up.railway.app/api` (URL из шага 3)
   - `NODE_ENV` = `production`

3. Railway автоматически:
   - Определит React проект
   - Установит зависимости
   - Соберёт проект (`npm run build`)
   - Запустит статический сервер

## Шаг 6: Обновление переменных окружения

После получения URL фронтенда:

1. Вернитесь в **Backend** сервис
2. **Variables** → обновите `FRONTEND_URL` на URL вашего фронтенда

## Проверка работы

### Backend:
1. Откройте `https://your-backend.up.railway.app`
2. Должно отобразиться JSON с информацией об API
3. Откройте `https://your-backend.up.railway.app/health`
4. Должен вернуться `{"status":"OK",...}`

### Frontend:
1. Откройте URL вашего фронтенда
2. Добавьте товар в корзину
3. Проверьте логи backend - должны появиться запросы

### MongoDB:
1. В Railway откройте MongoDB сервис
2. Нажмите **"Data"** или **"Mongo Express"**
3. Должна быть база данных с коллекцией `users`

## Структура проекта на Railway

```
Railway Project
├── Backend Service (Root: backend/)
│   ├── Port: 3001 (автоматически)
│   ├── URL: https://your-backend.up.railway.app
│   └── Variables:
│       ├── MONGO_URL (автоматически)
│       ├── FRONTEND_URL
│       └── PORT (автоматически)
│
├── Frontend Service (Root: /)
│   ├── Build: npm run build
│   ├── URL: https://your-frontend.up.railway.app
│   └── Variables:
│       └── REACT_APP_API_URL
│
└── MongoDB Service
    └── MONGO_URL (автоматически создаётся)
```

## Troubleshooting

### Backend не запускается:
- Проверьте логи в Railway
- Убедитесь, что `MONGO_URL` или `MONGODB_URI` установлен
- Проверьте Root Directory = `backend`

### Frontend не может подключиться к Backend:
- Проверьте `REACT_APP_API_URL` в переменных фронтенда
- Убедитесь, что URL backend правильный
- Проверьте CORS в backend (должен разрешать домен фронтенда)

### MongoDB connection error:
- Проверьте, что MongoDB сервис запущен
- Убедитесь, что переменная `MONGO_URL` доступна в backend
- Проверьте логи backend для деталей ошибки

### Frontend показывает ошибки API:
- Откройте консоль браузера (F12)
- Проверьте ошибки CORS или 404
- Убедитесь, что `REACT_APP_API_URL` начинается с `https://`

## Автоматическое обновление

Railway автоматически деплоит изменения при каждом push в GitHub!

## Мониторинг

- **Logs**: Реальные логи в реальном времени
- **Metrics**: Использование CPU, памяти, сети
- **Health Checks**: Автоматическая проверка здоровья сервисов

## Полезные команды Railway CLI

Если установлен Railway CLI:

```bash
# Логи
railway logs

# Переменные окружения
railway variables

# Статус деплоя
railway status
```

## Дополнительно

- Настройте кастомные домены в настройках каждого сервиса
- Используйте Railway Secrets для чувствительных данных
- Настройте автоскейлинг если нужно
