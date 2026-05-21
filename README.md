# Key Features
- Account System: Registration and authorization using JWT tokens. Secure password hashing with bcrypt.
- Personalized Galleries: Each user has access exclusively to their own uploaded images.
- Storage Quotas: Automatic tracking of used space. Storage is limited to 500 MB per user.
- File Storage: Utilizes MongoDB GridFS for streaming media files directly into the database, keeping the local disk clean.
- Real-time Interaction: Synchronization of UI elements like the image slider between connected clients using Socket.io.
- User Interface: Responsive React interface with support for protected routes and a dark and light theme toggle.

## Technologies Used
- React 18 and Vite for the library and bundler.
- TypeScript for strict typing of interfaces and API responses.
- React Router DOM for routing including protected routes.
- Axios as the HTTP client with configured interceptors for automatic JWT transmission.
- SCSS for styling the application.
## How to Run

### Start the Client
```bash
cd react-client
npm install
npm run dev
http://localhost:5173
```
### Project structure
- The project is divided into two independent parts that communicate via a REST API. The backend folder contains the MVC architecture of controllers, services, Mongoose models, and GridFS logic. The frontend folder contains React components, the Context API for managing authorization state, and services for API access.

### Backend
https://github.com/anatolii-dotsenko/gallery-backend

### Screenshots
