import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize users storage if it doesn't exist
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  function signup(email, password) {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(user => user.email === email)) {
          reject(new Error('User already exists with this email'));
          return;
        }

        // Create new user
        const newUser = {
          uid: Date.now().toString(), // Simple ID generation
          email: email,
          createdAt: new Date().toISOString()
        };

        // Save user to users list
        users.push({ ...newUser, password }); // In real app, never store plain password
        localStorage.setItem('users', JSON.stringify(users));

        // Set as current user
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    });
  }

  function login(email, password) {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const userWithoutPassword = {
          uid: user.uid,
          email: user.email,
          createdAt: user.createdAt
        };

        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

        resolve(userWithoutPassword);
      } catch (error) {
        reject(error);
      }
    });
  }

  function logout() {
    return new Promise((resolve) => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      resolve();
    });
  }

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
