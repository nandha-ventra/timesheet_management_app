import express from 'express';
import cors from 'cors';
import { users, timesheets } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { email, name, clerkId } = req.body;
  const newUser = { id: clerkId || String(users.length + 1), email, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Timesheets endpoints
app.get('/api/timesheets', (req, res) => {
  res.json(timesheets);
});

app.post('/api/timesheets', (req, res) => {
  const { userId, date, hours, description } = req.body;
  const newTimesheet = {
    id: String(timesheets.length + 1),
    userId,
    date,
    hours,
    description
  };
  timesheets.push(newTimesheet);
  res.status(201).json(newTimesheet);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
