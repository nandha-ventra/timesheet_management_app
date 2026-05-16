import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { 
  SignedIn, 
  SignedOut, 
  SignIn, 
  SignUp, 
  UserButton,
  useUser
} from '@clerk/clerk-react';
import './App.css';
import RoleManager from './RoleManager';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f0f0f0', alignItems: 'center' }}>
      <h1>Timesheet App</h1>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <SignedOut>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>
      </nav>
    </header>
  );
};

const HomePage = () => {
  const { user } = useUser();
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to the Timesheet Management App</h2>
      <SignedIn>
        <p>You are signed in! You can now manage your timesheets.</p>
        {user && <RoleManager username={user.username || user.firstName || 'guest'} />}
      </SignedIn>
      <SignedOut>
        <p>Please sign in or register to manage your timesheets.</p>
      </SignedOut>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="auth-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
