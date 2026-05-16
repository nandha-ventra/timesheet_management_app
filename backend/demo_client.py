import requests
import json

BASE_URL = "http://localhost:8000"

def demo():
    # 1. List users
    print("--- Current Users ---")
    users = requests.get(f"{BASE_URL}/users").json()
    print(json.dumps(users, indent=2))

    # 2. Login as alice
    print("\n--- Logging in as alice ---")
    login_resp = requests.post(f"{BASE_URL}/login", json={"username": "alice"}).json()
    print(json.dumps(login_resp, indent=2))
    
    user_id = login_resp["user"]["id"]

    # 3. Update alice's role to 'manager'
    print(f"\n--- Updating role for user {user_id} to 'manager' ---")
    update_resp = requests.patch(
        f"{BASE_URL}/users/{user_id}/role", 
        json={"role": "manager"}
    ).json()
    print(json.dumps(update_resp, indent=2))

    # 4. Verify update
    print("\n--- Verifying update ---")
    users = requests.get(f"{BASE_URL}/users").json()
    print(json.dumps(users, indent=2))

if __name__ == "__main__":
    try:
        demo()
    except requests.exceptions.ConnectionError:
        print("Error: Make sure the FastAPI server is running on http://localhost:8000")
