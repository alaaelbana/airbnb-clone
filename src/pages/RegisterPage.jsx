import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Register successful. Now you can log in");
    } catch (err) {
      alert("Register failed. please try again later");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-[20vh]">
        <h1 className="text-4xl text-center mb-4 font-medium">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary mt-2">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link to={"/login"} className="text-black underline">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
