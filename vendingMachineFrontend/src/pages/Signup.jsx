import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const signup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:8080/api/users/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        isAdmin: role === "admin",
      }),
    });

    if (res.status === 409) {
      alert("User already registered. Please login.");
      return;
    }

    if (!res.ok) {
      alert("Signup failed");
      return;
    }

    alert("Signup successful. Please login.");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

      <label>
        <input
          type="radio"
          checked={role === "customer"}
          onChange={() => setRole("customer")}
        />
        Customer
      </label>

      <label style={{ marginLeft: "10px" }}>
        <input
          type="radio"
          checked={role === "admin"}
          onChange={() => setRole("admin")}
        />
        Admin
      </label>

      <br /><br />
      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;
