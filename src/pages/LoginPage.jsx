import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const LoginPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [email, setEmail] = useState("alaaelbana@gmail.com");
  const [password, setPassword] = useState("123456789");
  function LoginSubmit(e) {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then(({ data }) => {
        alert("Login successful.");
        cookies.set("token", data, { path: "/" });
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed. please try again later");
      });
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-[20vh]">
        <h1 className="text-4xl text-center mb-4 font-medium">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={LoginSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary mt-2">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="text-black underline">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
