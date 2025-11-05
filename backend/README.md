# AppleShop Backend API

Backend API для AppleShop с MongoDB для хранения данных клиентов.

## Установка

```bash
npm install
```

## Настройка

Создайте файл `.env` на основе `.env.example`:

```bash
PORT=3001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```

## Запуск

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Проверка работоспособности сервера

### User Management
- `POST /api/user` - Создать или получить пользователя
- `GET /api/user/:clientId` - Получить данные пользователя
- `POST /api/user/cart` - Обновить корзину
- `POST /api/user/checkout` - Сохранить данные checkout
- `GET /api/users` - Получить всех пользователей (admin)

## Данные пользователя

Схема данных включает:
- `clientId` - Уникальный ID клиента
- `cookie` - Cookie пользователя
- `cart` - Товары в корзине
- `checkout` - Данные с формы checkout (email, имя, адрес и т.д.)
- `country` - Страна откуда перешёл пользователь (определяется по IP)
- `ipAddress` - IP адрес пользователя
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления

## Деплой на Railway

1. Создайте проект на Railway
2. Подключите MongoDB (используйте Railway MongoDB или внешний)
3. Установите переменные окружения:
   - `MONGODB_URI` или `MONGO_URL` - строка подключения к MongoDB
   - `PORT` - порт (Railway установит автоматически)
   - `FRONTEND_URL` - URL вашего фронтенда
4. Деплой из GitHub или через Railway CLI

## Railway MongoDB

Если используете MongoDB от Railway:
1. Добавьте MongoDB сервис в проект
2. Railway автоматически создаст переменную `MONGO_URL`
3. Backend автоматически использует её для подключения
