import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const Timesheets = () => {
  const { user } = useUser();
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTimesheet, setNewTimesheet] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: ''
  });

  useEffect(() => {
    fetchTimesheets();
    syncUser();
  }, [user]);

  const syncUser = async () => {
    if (!user) return;
    try {
      await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName
        })
      });
    } catch (error) {
      console.error('Error syncing user:', error);
    }
  };

  const fetchTimesheets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/timesheets');
      const data = await response.json();
      // Filter for current user in a real app, but for now we show all or filter by user.id
      setTimesheets(data.filter(ts => ts.userId === user?.id));
    } catch (error) {
      console.error('Error fetching timesheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch('http://localhost:3001/api/timesheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTimesheet,
          userId: user.id,
          hours: Number(newTimesheet.hours)
        })
      });

      if (response.ok) {
        setNewTimesheet({
          date: new Date().toISOString().split('T')[0],
          hours: '',
          description: ''
        });
        fetchTimesheets();
      }
    } catch (error) {
      console.error('Error adding timesheet:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Your Timesheets</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
        <input
          type="date"
          value={newTimesheet.date}
          onChange={(e) => setNewTimesheet({ ...newTimesheet, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Hours"
          value={newTimesheet.hours}
          onChange={(e) => setNewTimesheet({ ...newTimesheet, hours: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newTimesheet.description}
          onChange={(e) => setNewTimesheet({ ...newTimesheet, description: e.target.value })}
          required
        />
        <button type="submit">Add Entry</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Hours</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map(ts => (
            <tr key={ts.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{ts.date}</td>
              <td style={{ padding: '0.5rem' }}>{ts.hours}</td>
              <td style={{ padding: '0.5rem' }}>{ts.description}</td>
            </tr>
          ))}
          {timesheets.length === 0 && (
            <tr>
              <td colSpan="3" style={{ padding: '1rem', textAlign: 'center' }}>No entries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheets;
