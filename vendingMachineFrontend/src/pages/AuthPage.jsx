import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Success from "./Success";

function AuthPage() {
  const [message, setMessage] = useState(null);

  if (message) {
    return <Success message={message} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "40px" }}>
        <Signup onSuccess={setMessage} />
      </div>

      <div style={{ flex: 1, padding: "40px" }}>
        <Login onSuccess={setMessage} />
      </div>
    </div>
  );
}

export default AuthPage;
