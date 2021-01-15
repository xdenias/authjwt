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
    axios
      .post("/login", user, {
        headers: {
          withCredentials: true,
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then(function (response) {
        // console.log(response);
        localStorage.setItem("token", JSON.stringify(response));
        axios.defaults.headers.Authorization = `Bearer ${response}`;
        setAuthenticated(true);
        // console.log("Foi com sucesso");
        history.push("/users");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    axios.defaults.headers.Authorization = undefined;
    history.push("/");
  }

  return { authenticated, loading, handleLogout, handleSubmit };
}
