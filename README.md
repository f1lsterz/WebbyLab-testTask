# WebbyLab-testTask

Тестове завдання на позицію trainee node.js

---

## 📝 Опис

Це REST API для зберігання інформації про фільми з підтримкою авторизації користувача. Функціонал включає:

- Авторизацію користувача (login)
- Додавання, перегляд, редагування, видалення фільмів
- Пошук фільмів за назвою або іменем актора
- Імпорт фільмів із текстового файлу
- Повернення списку фільмів, відсортованого за назвою

---

## ⚙️ Технології

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Docker

---

## 📂 Структура проєкту

```
server/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── db/
│   └── middlewares/
├── Dockerfile
├── package.json
├── main.js
└── .env
```

---

## ⚙️ Налаштування через змінні оточення

Використовується файл `.env` у корені:

```env
APP_PORT=8000
JWT_SECRET=your_jwt_secret
```

---

## 📦 Локальний запуск

1. **Клонувати репозиторій:**

```bash
git clone https://github.com/f1lsterz/WebbyLab-testTask.git
cd WebbyLab-testTask/server
```

2. **Встановити залежності:**

```bash
npm install
```

3. **Створити файл `.env` з налаштуванням порту як в прикладі:**

```env
PORT=8000
```

4. **Запустити сервер:**

```bash
npm start
```

Сервер буде доступний за адресою `http://localhost:8000`.

---

## 🐳 Docker

### Збірка Docker-образу

```bash
docker build -t your_dockerhub_username/movies .
```

### Публікація на DockerHub

```bash
docker login
docker push your_dockerhub_username/movies
```

### Запуск як вимагається:

```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 your_dockerhub_username/movies
```

Після запуску сервер буде доступний на `http://localhost:8000`.

---

## 📋 API

Повна специфікація API: [Postman Collection](https://documenter.getpostman.com/view/356840/TzkyLeVK)
