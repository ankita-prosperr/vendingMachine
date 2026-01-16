import { useNavigate } from "react-router-dom";

function AppLayout({ children }) {
  const navigate = useNavigate();

  const logout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    await fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen relative">
      {children}

      <button
        onClick={logout}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default AppLayout;
