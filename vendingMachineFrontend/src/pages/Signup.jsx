import { useState } from "react";

function Signup({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const signup = async () => {
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

    if (!res.ok) {
      alert("Signup failed");
      return;
    }

    onSuccess("Signed up successfully");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} /><br /><br />
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
      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;
