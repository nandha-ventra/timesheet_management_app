# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Backend (FastAPI)

A FastAPI backend is located in the `backend/` directory. It uses a mock in-memory database to store user data.

### Features
- Mock user storage.
- Login endpoint.
- Update user role endpoint (to be used after login).

### Setup and Run
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### API Endpoints
- `GET /users`: List all users.
- `POST /login`: Mock login (requires `username`).
- `PATCH /users/{id}/role`: Update a user's role.

### Demo
You can run the demo client to see the flow in action:
```bash
python backend/demo_client.py
```
