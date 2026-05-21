# Навчальна практика


## Technologies Used
* **Фреймворк:** React + Vite
* **Мова:** TypeScript
* **Dependency Injection:** `inversify` та `reflect-metadata` (дозволяє абстрагувати логіку запитів та рендерингу в окремі сервіси).
* **Real-time зв'язок:** `socket.io-client` (для синхронізації слайдера між різними вкладками/клієнтами).
* **Взаємодія з сервером:** Fetch API (отримання списків, статичних зображень та завантаження фото в MongoDB GridFS).
**Backend (Node.js/Express):** `tsyringe` for DI. The app resolves services (`FileService`, `ContentService`) from a central DI container.
https://github.com/anatolii-dotsenko/server
- **Testing:** `jest` and `ts-jest` for unit testing the backend services with mocked file system (`fs`) dependencies.

## How to Run

### Start the Client
```bash
cd react-client
npm install
npm run dev
http://localhost:5173
```
### Comments
Усі стилі тепер компілюються через Sass, виглядають точно так само, але код став значно чистішим та легшим для масштабування завдяки змінним, міксинам (@mixin) та наслідуванню (@extend).
### Screenshots
