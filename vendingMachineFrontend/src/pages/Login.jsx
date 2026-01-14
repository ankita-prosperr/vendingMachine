import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        isAdmin: role === "admin",
      }),
    });

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    const user = await res.json();

    if (!user.isAdmin) {
      navigate("/vending-machines");
    } else {
      alert("Admin logged in");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br /><br />

      <label>
        <input type="radio" checked={role === "customer"} onChange={() => setRole("customer")} />
        Customer
      </label>

      <label style={{ marginLeft: "10px" }}>
        <input type="radio" checked={role === "admin"} onChange={() => setRole("admin")} />
        Admin
      </label>

      <br /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
