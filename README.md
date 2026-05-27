# Superbase-with-React-js-For-Authentication
---
# React + Supabase Authentication Setup

This project demonstrates how to use Supabase Authentication with React.js using Context API.

## Features

- Email & Password Authentication
- Google Authentication
- Context API Authentication System
- Protected Routes
- Persistent Login Session
- Logout Functionality
- Reusable Auth Hook

---

# Technologies Used

## Frontend
- React.js
- React Router DOM
- Context API
- Supabase

---

# Install Dependencies

Using pnpm:

```bash
pnpm add @supabase/supabase-js
```

Using npm:

```bash
npm install @supabase/supabase-js
```

---

# Create Supabase Project

Visit:

https://supabase.com

## Steps

1. Create a Supabase account
2. Create a new project
3. Copy:
   - Project URL
   - Anon Public Key

---

# Environment Variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Restart your Vite server after changing environment variables.

---

# Project Structure

```bash
src/
│
├── supabase/
│   └── supabase.js
│
├── context/
│   └── AuthProvider.jsx
│
├── hooks/
│   └── useAuth.js
│
├── routes/
│   └── PrivateRoute.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
│
├── App.jsx
└── main.jsx
```

---

# Supabase Configuration

## `src/supabase/supabase.js`

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
```

---

# Authentication Context

## `src/context/AuthProvider.jsx`

```jsx
import {
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase/supabase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = async (
    email,
    password
  ) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  };

  // login user
  const signInUser = async (
    email,
    password
  ) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  // google login
  const googleLogin = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  // logout user
  const logoutUser = async () => {
    return await supabase.auth.signOut();
  };

  useEffect(() => {
    // current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

---

# Wrap Application

## `main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

---

# Custom Auth Hook

## `src/hooks/useAuth.js`

```js
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
```

---

# Login Example

## `src/pages/Login.jsx`

```jsx
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } =
      await signInUser(email, password);

    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
```

---

# Register Example

## `src/pages/Register.jsx`

```jsx
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } =
      await createUser(email, password);

    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
```

---

# Google Login

```jsx
const { googleLogin } = useAuth();

const handleGoogleLogin = async () => {
  const { data, error } =
    await googleLogin();

  if (error) {
    console.log(error.message);
  } else {
    console.log(data);
  }
};
```

---

# Enable Google Provider

1. Go to Supabase Dashboard
2. Authentication
3. Providers
4. Enable Google Provider
5. Add Google OAuth Credentials

Google Cloud Console:

https://console.cloud.google.com

---

# Private Route

## `src/routes/PrivateRoute.jsx`

```jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
```

---

# Example Protected Route

```jsx
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

---

# Logout Example

```jsx
const { logoutUser } = useAuth();

const handleLogout = async () => {
  await logoutUser();
};
```

---

# Session Persistence

Supabase automatically:
- stores session
- refreshes tokens
- restores login state
- keeps users logged in after reload

No need for:
- localStorage JWT setup
- manual token refresh
- cookie management

---

# Advantages of Supabase Auth

- Easy authentication system
- Backend already managed
- Secure session handling
- JWT included
- Social login support
- Works perfectly with React

---

# Official Documentation

## Supabase
https://supabase.com/docs

## React Auth Docs
https://supabase.com/docs/guides/auth/quickstarts/react

## Basic idea Own Docs
https://docs.google.com/document/d/1-wDi4nQE4TTMmed1Pew_8uetoKOTjyJc_tau6LLg68I/edit?usp=sharing


---

# Conclusion

Supabase Authentication with React Context API is a clean and scalable solution for modern React applications.

It is beginner friendly while still powerful enough for production-level applications.
