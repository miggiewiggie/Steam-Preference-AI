import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/auth/me", {  // ✅ correct endpoint
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);            // ✅ unwrap { user: ... }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      {user ? <Dashboard user={user} /> : <Login />}
    </div>
  );
}

function Login() {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/auth/steam";
  };

  return (
    <div className="login">
      <h1>BacklogSense</h1>
      <p>Your AI-powered Steam backlog assistant</p>
      <button className="login-btn" onClick={handleLogin}>
        Login with Steam
      </button>
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Welcome, {user.displayName}</h1>
      <img src={user.photos?.[0]?.value} alt="avatar" />
      <p>SteamID: {user.id}</p>
    </div>
  );
}

export default App;