import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/AuthProvider";
import api from "../../utils/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const { handleLogout } = useContext(Context);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/messages");
      console.log(data);
      setUsers(data);
    })();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.message}>{user.message}</li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>
        Sair
      </button>
    </>
  );
}
