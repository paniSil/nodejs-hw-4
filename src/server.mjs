// Імпортуємо необхідні модулі
import { handleRequest } from './routers/router.mjs';
import http from 'http'

// Дозволяється використовувати змінну середовища `PORT`
const PORT = process.env.PORT || 3000;

// обробка запитів
const server = http.createServer((req, res) => handleRequest(req, res));

// Створіть сервер, який слухає вхідні з'єднання на порті `3000`.
server.listen(PORT, () => {
  console.log(`Server is available via http://localhost:${PORT}/`);
});

// Обов'язково експортувати створений сервер та інші функції для тестів
export { server };