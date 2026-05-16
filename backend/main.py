from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="User Management API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database
users_db: Dict[int, Dict[str, Any]] = {
    1: {"id": 1, "username": "alice", "role": "user"},
    2: {"id": 2, "username": "bob", "role": "user"},
    3: {"id": 3, "username": "admin", "role": "admin"},
}

class User(BaseModel):
    id: int
    username: str
    role: str

class RoleUpdate(BaseModel):
    role: str

class LoginRequest(BaseModel):
    username: str

@app.get("/users", response_model=List[User])
async def get_users():
    """Retrieve all users from the mock database."""
    return list(users_db.values())

@app.post("/login")
async def login(request: LoginRequest):
    """
    Simulated login endpoint.
    In a real app, you would verify credentials here.
    """
    user = next((u for u in users_db.values() if u["username"] == request.username), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username")
    
    return {
        "message": "Login successful",
        "user": user,
        "instructions": "To update role after login, call PATCH /users/{id}/role"
    }

@app.patch("/users/{user_id}/role", response_model=User)
async def update_user_role(user_id: int, role_update: RoleUpdate):
    """
    Update the role of a specific user.
    This can be called after a successful login.
    """
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    users_db[user_id]["role"] = role_update.role
    return users_db[user_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
