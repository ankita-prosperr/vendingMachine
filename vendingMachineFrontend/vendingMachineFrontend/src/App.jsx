import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  // GET ALL USERS
  const getAllUsers = async () => {
    const res = await fetch("http://localhost:8080/api/users/getAllUsers");
    const data = await res.json();
    setUsers(data);
  };

  // CREATE USER
  const createUser = async () => {
    const res = await fetch("http://localhost:8080/api/users/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Kumar",
        email: "kumar@gmail.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    console.log("Created:", data);
    getAllUsers();
  };

  // GET USER BY ID
  const getUserById = async () => {
    if (!userId) return;

    const res = await fetch(
      `http://localhost:8080/api/users/getUser/${userId}`
    );
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  };

  // UPDATE USER
  const updateUser = async () => {
    if (!userId) return;

    const res = await fetch(
      `http://localhost:8080/api/users/updateUser/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Updated Kumar",
          email: "updated@gmail.com",
          password: "updated123",
        }),
      }
    );

    const data = await res.json();
    console.log("Updated:", data);
    getAllUsers();
  };

  // DELETE USER
  const deleteUser = async () => {
    if (!userId) return;

    await fetch(
      `http://localhost:8080/api/users/deleteUser/${userId}`,
      {
        method: "DELETE",
      }
    );

    getAllUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test User APIs</h2>

      <button onClick={createUser}>Create User</button>
      <button onClick={getAllUsers}>Get All Users</button>

      <div style={{ marginTop: "10px" }}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <button onClick={getUserById}>Get User By ID</button>
      <button onClick={updateUser}>Update User</button>
      <button onClick={deleteUser}>Delete User</button>

      <hr />

      <h3>All Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id} - {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
