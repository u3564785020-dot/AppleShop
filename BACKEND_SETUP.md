# 🔧 Инструкция по настройке Backend на Railway

## Проблема: Backend сервис не создан или не настроен

Если вы видите только Frontend и MongoDB, но нет Backend сервиса - его нужно создать!

## Шаг 1: Проверка наличия Backend сервиса

1. Откройте ваш проект на [Railway](https://railway.com)
2. В левой панели проверьте список сервисов
3. **Если нет сервиса с названием типа "Backend", "AppleShop Backend" или подобного** - переходите к Шагу 2

## Шаг 2: Создание Backend сервиса

### 2.1. Добавление нового сервиса

1. В проекте Railway нажмите **"+ New"** (в правом верхнем углу или в левой панели)
2. Выберите **"GitHub Repo"**
3. Выберите тот же репозиторий, который использует Frontend
4. Railway создаст новый сервис

### 2.2. Настройка Root Directory

1. Выберите только что созданный сервис
2. Перейдите на вкладку **"Settings"**
3. Найдите раздел **"Root Directory"**
4. Введите: `backend`
5. Нажмите **"Save"** или **"Update"**

### 2.3. Настройка переменных окружения

1. Перейдите на вкладку **"Variables"**
2. Добавьте следующие переменные (нажмите **"+ New Variable"** для каждой):

   ```
   MONGODB_URI=<ваш_MONGO_URL>
   ```
   
   **Где взять MONGO_URL?**
   - Перейдите в сервис MongoDB
   - Вкладка **"Variables"**
   - Найдите переменную `MONGO_URL` или `MONGODB_URI`
   - Скопируйте её значение
   - Вставьте в переменную бэкенда
   
   ```
   FRONTEND_URL=https://appleshop-production-ae28.up.railway.app
   ```
   
   **Важно:** Замените `appleshop-production-ae28.up.railway.app` на реальный URL вашего фронтенда!
   
   ```
   NODE_ENV=production
   ```

3. После добавления всех переменных Railway автоматически перезапустит сервис

## Шаг 3: Проверка работы Backend

### 3.1. Проверка Public URL

1. В сервисе Backend найдите раздел **"Domains"** или **"Settings"**
2. Убедитесь, что у бэкенда есть **Public URL** (например: `https://your-backend.up.railway.app`)
3. Если URL нет - нажмите **"Generate Domain"** или **"Settings" → "Generate Domain"**

### 3.2. Проверка Health Endpoint

1. Откройте Public URL бэкенда в браузере
2. Вы должны увидеть JSON с информацией об API:
   ```json
   {
     "message": "AppleShop Backend API",
     "version": "1.0.0",
     ...
   }
   ```
3. Откройте `/health` endpoint:
   ```
   https://your-backend.up.railway.app/health
   ```
4. Должен вернуться:
   ```json
   {
     "status": "OK",
     "timestamp": "...",
     "environment": "production"
   }
   ```

### 3.3. Проверка логов

1. В сервисе Backend перейдите на вкладку **"Deployments"** или **"Logs"**
2. Ищите сообщения:
   - ✅ **"MongoDB Connected: ..."** - успешное подключение к БД
   - ✅ **"Server running on port ..."** - сервер запущен
   - ❌ **"MongoDB connection error"** - ошибка подключения
   - ❌ **"Error: MongoDB URI is not defined"** - не установлена переменная окружения

## Шаг 4: Обновление Frontend переменных

1. Перейдите в сервис **Frontend** ("AppleShop")
2. Вкладка **"Variables"**
3. Убедитесь, что есть переменная:
   ```
   REACT_APP_API_URL=https://your-backend.up.railway.app/api
   ```
   **Важно:** Замените `your-backend.up.railway.app` на реальный URL вашего бэкенда!
4. После обновления Railway пересоберёт фронтенд

## Шаг 5: Проверка структуры проекта

Убедитесь, что в вашем репозитории есть папка `backend/` со следующей структурой:

```
backend/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── db.js
│   └── server.js
├── package.json
├── Procfile
└── nixpacks.toml
```

## Шаг 6: Проверка package.json бэкенда

Убедитесь, что в `backend/package.json` есть правильные скрипты:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

## Частые проблемы и решения

### ❌ Проблема: "MongoDB connection error"

**Решение:**
1. Проверьте, что переменная `MONGODB_URI` или `MONGO_URL` установлена в бэкенде
2. Проверьте, что MongoDB сервис запущен
3. Убедитесь, что значение переменной скопировано правильно (без лишних пробелов)

### ❌ Проблема: "Root Directory is not set"

**Решение:**
1. Перейдите в Settings бэкенда
2. Установите Root Directory = `backend`
3. Сохраните изменения

### ❌ Проблема: Frontend не может подключиться к Backend (CORS error)

**Решение:**
1. Проверьте, что `FRONTEND_URL` в бэкенде указывает на правильный URL фронтенда
2. Проверьте, что `REACT_APP_API_URL` во фронтенде указывает на правильный URL бэкенда с `/api` в конце
3. Убедитесь, что оба сервиса перезапущены после изменения переменных

### ❌ Проблема: Backend не запускается

**Решение:**
1. Проверьте логи бэкенда на наличие ошибок
2. Убедитесь, что `backend/package.json` существует и содержит правильные зависимости
3. Проверьте, что `backend/src/server.js` существует

## Быстрая проверка

После настройки проверьте следующее:

1. ✅ Backend сервис существует в Railway
2. ✅ Root Directory = `backend`
3. ✅ Переменные окружения установлены:
   - `MONGODB_URI` или `MONGO_URL`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
4. ✅ Backend имеет Public URL
5. ✅ `/health` endpoint возвращает `{"status": "OK"}`
6. ✅ Логи показывают "MongoDB Connected"
7. ✅ Frontend имеет переменную `REACT_APP_API_URL` с правильным URL бэкенда

## После успешной настройки

1. Frontend будет автоматически подключаться к Backend
2. Данные корзины будут сохраняться в MongoDB
3. Данные чекаута будут сохраняться в MongoDB
4. Страна пользователя будет определяться автоматически

---

**Нужна помощь?** Проверьте логи бэкенда и пришлите сообщение об ошибке!
