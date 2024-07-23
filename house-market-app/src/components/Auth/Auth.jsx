import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Auth = ({ isRegister, onAuth }) => {
  const navigate = useNavigate();
  const { request, loading, error } = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authData = { email, password };
    const url = isRegister
      ? "http://localhost:3001/register"
      : "http://localhost:3001/login";
    const method = "POST";

    request(
      { url, method, data: authData },
      (data) => {
        onAuth(data);
        navigate("/");
      },
      (err) => console.error(err)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      {error && <p className="error-message">{error}</p>}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default Auth;
