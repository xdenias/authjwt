import { useState, useEffect } from "react";

import axios from "../../utils/api";
import history from "../../utils/history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  function handleSubmit(e, user) {
    e.preventDefault();
    console.log(e, user);
    const newUser = JSON.stringify(user);
    console.log(newUser);

    // axios
    //   .post("/user", newUser)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  async function handleLogin() {
    const {
      data: { token },
    } = await axios.post("/login");

    localStorage.setItem("token", JSON.stringify(token));
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push("/users");
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    axios.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, handleLogin, handleLogout, handleSubmit };
}
