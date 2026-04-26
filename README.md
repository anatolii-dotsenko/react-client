# lab27. Client-Server App: Dependency Injection & Testing

This project demonstrates a full-stack implementation of **Dependency Injection (DI)** using TypeScript, React, Node.js, and Socket.IO, along with Unit Testing.

## Technologies Used
- **Frontend (React):** `inversify`, `reflect-metadata` for DI. Logic is delegated to injectable services (`ApiService`, `ListRenderer`).
- **Backend (Node.js/Express):** `tsyringe` for DI. The app resolves services (`FileService`, `ContentService`) from a central DI container.
https://github.com/anatolii-dotsenko/server
- **Testing:** `jest` and `ts-jest` for unit testing the backend services with mocked file system (`fs`) dependencies.

## How to Run

### Start the Client
```bash
cd react-client
npm install
npm run dev
```