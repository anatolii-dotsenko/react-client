# lab33. Навігація зі сторінками та auth guard

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
Тепер головний компонент App огортає весь додаток провайдером <AuthProvider>, що дає доступ до авторизації на будь-якій сторінці
/images які ми завантажуємо в (MongoDB GridFS) тепер знаходиться всередині <ProtectedRoute>. Якщо ви спробуєте перейти туди без авторизації, вас автоматично перекине на сторінку /auth
Запустіть клієнт (npm run dev). Спробуйте залогінитись: введіть будь-які дані у форму і натисніть "Увійти". В меню з'явиться посилання на "Зображення" і ви потрапите в Особистий кабінет
### Screenshots
