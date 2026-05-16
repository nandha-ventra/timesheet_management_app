import React, { useState, useEffect } from 'react';

const RoleManager = ({ username }) => {
  const [user, setUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    if (username) {
      handleLogin();
    }
  }, [username]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setMessage('Logged into backend successfully');
      } else {
        setMessage(data.detail || 'Login failed');
      }
    } catch (error) {
      setMessage('Error connecting to backend');
    }
  };

  const updateRole = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/users/${user.id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setMessage(`Role updated to ${data.role}`);
      } else {
        setMessage(data.detail || 'Update failed');
      }
    } catch (error) {
      setMessage('Error updating role');
    }
  };

  if (!username) return <p>Please sign in to manage roles.</p>;

  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Backend Sync & Role Management</h3>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Current Role:</strong> {user.role}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={newRole} 
              onChange={(e) => setNewRole(e.target.value)} 
              placeholder="Enter new role"
            />
            <button onClick={updateRole}>Update Role</button>
          </div>
        </div>
      ) : (
        <p>Loading user data from backend...</p>
      )}
      {message && <p style={{ color: 'blue' }}>{message}</p>}
    </div>
  );
};

export default RoleManager;
