import Signup from "./Signup";
import Login from "./Login";

function AuthPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "40px" }}>
        <Signup />
      </div>

      <div style={{ flex: 1, padding: "40px" }}>
        <Login />
      </div>
    </div>
  );
}

export default AuthPage;
