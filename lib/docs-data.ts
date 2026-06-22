export const docsContent: Record<string, string> = {
  "getting-started": `# Getting Started

Welcome to the comprehensive guide on integrating Supabase authentication with React.js! This documentation will walk you through everything you need to know to implement secure, scalable authentication in your React applications.

## What You'll Learn

In this guide, you'll discover:
- How to set up Supabase in your React application
- Implementing email and password authentication
- Social login integration with Google
- Managing user sessions and persistence
- Protecting routes and components
- Best practices for authentication in React

## Prerequisites

Before you start, ensure you have:
- Basic knowledge of React and JavaScript
- Node.js and npm/pnpm installed
- A Supabase account (free tier available)
- Familiarity with environment variables and .env files

## Why Supabase?

Supabase is an open-source Firebase alternative that provides:
- PostgreSQL database out of the box
- Built-in authentication with multiple methods
- Real-time capabilities
- Row-level security for data protection
- Free tier with generous limits

Let's dive in and build a secure authentication system!`,

  "installation": `# Installation

Get your project ready for Supabase integration.

## Step 1: Create a React Project

If you don't have a React project yet, create one using Vite:

\`\`\`bash
npm create vite@latest my-auth-app -- --template react
cd my-auth-app
npm install
\`\`\`

## Step 2: Install Dependencies

Install the Supabase JavaScript client and additional utilities:

\`\`\`bash
npm install @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
\`\`\`

## Step 3: Initialize Tailwind CSS (Optional)

For a better-looking UI, set up Tailwind:

\`\`\`bash
npx tailwindcss init -p
\`\`\`

## Step 4: Project Structure

Create the following folder structure:

\`\`\`
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Logout.jsx
│   └── Layout/
│       └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── services/
│   └── supabaseClient.js
└── pages/
    ├── LoginPage.jsx
    ├── RegisterPage.jsx
    └── Dashboard.jsx
\`\`\`

All dependencies are now installed and ready to use!`,

  "setup-supabase": `# Supabase Setup

Set up your Supabase project for authentication.

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with email or GitHub
4. Create a new organization

## Step 2: Create a New Project

1. Click "New Project"
2. Enter your project name
3. Set a secure database password
4. Select your region (closest to your users)
5. Click "Create new project"

Wait for the project to be initialized (usually 1-2 minutes).

## Step 3: Get Your Credentials

1. Go to Project Settings → API
2. Copy your:
   - **Project URL**: Used for all API requests
   - **Anon Public Key**: Safe to expose in frontend
   - **Service Role Key**: Keep this secret (server-side only)

## Step 4: Enable Authentication Methods

1. Go to Authentication → Providers
2. Enable the following:
   - **Email** (default)
   - **Google OAuth** (optional)

For Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Copy the Client ID and Client Secret
6. Paste them in Supabase → Providers → Google

## Step 5: Configure Redirect URLs

1. Go to Authentication → URL Configuration
2. Add your redirect URLs:
   - \`http://localhost:3000\` (development)
   - \`https://yourdomain.com\` (production)
   - \`https://yourdomain.com/auth/callback\` (OAuth callback)

Your Supabase project is now ready!`,

  "environment-variables": `# Environment Variables

Configure your environment for secure credential management.

## Create .env.local File

In your project root, create a \`.env.local\` file:

\`\`\`bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
\`\`\`

## Important Security Notes

⚠️ **Never commit .env.local to version control**

Add to your .gitignore:

\`\`\`
# .gitignore
.env.local
.env*.local
\`\`\`

## Getting Your Values

### Supabase Credentials
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL → \`VITE_SUPABASE_URL\`
   - Anon Public Key → \`VITE_SUPABASE_ANON_KEY\`

### Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to APIs & Services → Credentials
4. Copy the Client ID → \`VITE_GOOGLE_CLIENT_ID\`

## Using Environment Variables

Access them in your code:

\`\`\`javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
\`\`\`

Environment variables are now configured!`,

  "project-structure": `# Project Structure

Organize your code for scalability and maintainability.

## Recommended Structure

\`\`\`
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx         # Login form component
│   │   ├── Register.jsx      # Registration form component
│   │   ├── Logout.jsx        # Logout button component
│   │   └── GoogleAuth.jsx    # Google OAuth button
│   └── Layout/
│       └── ProtectedRoute.jsx # Route protection wrapper
├── context/
│   └── AuthContext.jsx        # Auth state and provider
├── hooks/
│   └── useAuth.js            # Custom auth hook
├── services/
│   └── supabaseClient.js     # Supabase configuration
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── Dashboard.jsx
│   └── Profile.jsx
├── styles/
│   └── globals.css           # Global styles
└── App.jsx
\`\`\`

## Folder Explanations

### /components
Reusable React components for authentication UI and layouts.

### /context
React Context for global authentication state management.

### /hooks
Custom React hooks, like \`useAuth\` for accessing auth context.

### /services
External service configurations and API clients.

### /pages
Full page components for routing.

### /styles
Global CSS files and Tailwind configuration.

This structure scales well as your application grows!`,

  "authentication-context": `# Authentication Context

Create a global authentication state manager.

## Create AuthContext.jsx

\`\`\`javascript
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

## Use in App.jsx

\`\`\`javascript
import { AuthProvider } from './context/AuthContext';
import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
\`\`\`

Your authentication context is ready to manage global auth state!`,

  "custom-auth-hook": `# Custom Auth Hook

Create a convenient hook for accessing authentication.

## Create useAuth.js

\`\`\`javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
\`\`\`

## Usage in Components

Now use the hook in any component:

\`\`\`javascript
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default Dashboard;
\`\`\`

## Benefits

- ✅ Cleaner component code
- ✅ Automatic error handling
- ✅ Type-safe (with TypeScript)
- ✅ Reusable across the app
- ✅ Better testing capabilities

This hook simplifies auth usage throughout your app!`,

  "login-example": `# Login Example

Implement a functional login component.

## Create Login.jsx

\`\`\`javascript
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
\`\`\`

## Integration

Import and use in your routing:

\`\`\`javascript
import Login from './components/Auth/Login';

<Route path="/login" element={<Login />} />
\`\`\`

Your login component is ready!`,

  "register-example": `# Register Example

Create a registration component for new users.

## Create Register.jsx

\`\`\`javascript
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await signUp(email, password);

      if (error) {
        setError(error.message);
        return;
      }

      // Optionally redirect to login or dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default Register;
\`\`\`

Your registration component is ready for new users!`,

  "google-login": `# Google OAuth Login

Implement social authentication with Google.

## Create GoogleAuth.jsx

\`\`\`javascript
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

function GoogleAuth() {
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        },
      });

      if (error) {
        console.error('Google auth error:', error);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
    >
      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>
  );
}

export default GoogleAuth;
\`\`\`

## Auth Callback Handler

Create an auth callback page to handle redirects:

\`\`\`javascript
// pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Wait a moment for session to be processed
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  }, [navigate]);

  return <div>Processing authentication...</div>;
}

export default AuthCallback;
\`\`\`

## Add Route

\`\`\`javascript
<Route path="/auth/callback" element={<AuthCallback />} />
\`\`\`

## Supabase Configuration

Make sure Google OAuth is enabled in Supabase:
1. Go to Authentication → Providers
2. Enable Google
3. Add your Google OAuth credentials
4. Configure redirect URLs in Authentication → URL Configuration

Google login is now integrated!`,

  "private-routes": `# Private Routes

Protect routes that require authentication.

## Create ProtectedRoute.jsx

\`\`\`javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '@nextui-org/react';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
\`\`\`

## Usage in Routes

\`\`\`javascript
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
\`\`\`

## Features

- ✅ Automatic redirect to login for unauthenticated users
- ✅ Loading state while checking authentication
- ✅ Works with any component
- ✅ Easy to implement

Your routes are now protected!`,

  "session-persistence": `# Session Persistence

Maintain user sessions across page reloads.

## How It Works

The AuthContext already handles session persistence through Supabase. When a user logs in:

1. Supabase creates a session token
2. The token is stored in browser's local storage
3. On page reload, Supabase automatically restores the session
4. The AuthContext updates the user state

## Implementation Details

\`\`\`javascript
useEffect(() => {
  const checkSession = async () => {
    // Retrieves saved session from localStorage
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);
  };

  checkSession();

  // Subscribe to auth changes (handles new logins/logouts)
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    }
  );

  return () => subscription?.unsubscribe();
}, []);
\`\`\`

## Benefits

- ✅ Users stay logged in after refresh
- ✅ Works across browser tabs
- ✅ Automatic token refresh
- ✅ Secure token storage
- ✅ No additional setup needed

Session persistence is automatic!`,

  "logout": `# Logout Functionality

Implement secure logout for users.

## Create Logout.jsx

\`\`\`javascript
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      console.error('Logout error:', error);
    } else {
      navigate('/login');
    }
  };

  return (
    <Button
      color="danger"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export default Logout;
\`\`\`

## Add to Navbar

\`\`\`javascript
import Logout from './components/Auth/Logout';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1>MyApp</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <Logout />
        </div>
      )}
    </nav>
  );
}
\`\`\`

## What Happens on Logout

1. ✅ Session token is invalidated
2. ✅ User data is cleared from context
3. ✅ Local storage is cleared
4. ✅ User is redirected to login page

Logout is now secure and complete!`,

  "advantages": `# Advantages of Supabase & React

Learn why this stack is powerful for modern applications.

## 1. Built-in Authentication

Supabase provides:
- Email/password authentication
- Social OAuth (Google, GitHub, etc.)
- Magic links
- Multi-factor authentication (MFA)
- Row-level security (RLS)

No need to build from scratch!

## 2. PostgreSQL Database

- Fully-featured relational database
- SQL queries for complex operations
- ACID transactions
- Supports JSON/JSONB types
- Full-text search

## 3. Real-time Capabilities

- Real-time data subscriptions
- WebSocket-based updates
- Perfect for collaborative apps
- Live notifications

## 4. Security

- Automatic HTTPS
- JWT tokens
- Row-level security policies
- API rate limiting
- DDoS protection

## 5. Developer Experience

- Simple API and documentation
- Free tier with generous limits
- Supabase CLI for local development
- Excellent error messages
- Active community

## 6. Scalability

- Starts free, pay-as-you-go
- Auto-scaling infrastructure
- Handles millions of requests
- Global CDN for fast access

## 7. Open Source

- Full transparency
- Can self-host if needed
- Community contributions
- No vendor lock-in

## 8. Integration with React

- Lightweight JavaScript client
- Hooks support
- TypeScript support
- Perfect for modern React applications

This combination provides a solid foundation for any application!`,

  "conclusion": `# Conclusion

You now have a complete understanding of implementing Supabase authentication in React!

## What You've Learned

✅ Setting up Supabase project
✅ Installing and configuring dependencies
✅ Creating authentication context
✅ Building login and registration forms
✅ Implementing Google OAuth
✅ Protecting routes
✅ Managing sessions
✅ Implementing logout

## Next Steps

1. **Deploy Your App**
   - Use Vercel, Netlify, or any hosting platform
   - Configure production environment variables
   - Test authentication in production

2. **Add More Features**
   - User profiles
   - Email verification
   - Password reset
   - Two-factor authentication
   - Role-based access control

3. **Database Integration**
   - Create tables for user data
   - Set up row-level security policies
   - Implement database queries in React

4. **Security Best Practices**
   - Keep secrets in environment variables
   - Use HTTPS in production
   - Implement rate limiting
   - Regular security audits

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [React Documentation](https://react.dev)
- [Supabase Community Discord](https://discord.supabase.com)

## Support

If you encounter issues:
1. Check Supabase documentation
2. Search existing GitHub issues
3. Ask in Supabase Discord community
4. Check browser console for errors

Happy coding! 🚀`
};
