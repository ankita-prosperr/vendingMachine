import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const signup = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const res = await fetch("http://localhost:8080/api/users/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        isAdmin: role === "admin",
      }),
    });

    if (res.status === 409) {
      setError("User already registered. Please login.");
      return;
    }

    if (!res.ok) {
      setError("Signup failed");
      return;
    }

    navigate(role === "admin" ? "/admin/vending-machines" : "/vending-machines");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <div className="flex justify-center gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
            />
            Customer
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        <button
          onClick={signup}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-blue-600 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
