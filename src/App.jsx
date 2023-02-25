import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SinglePlace from "./pages/SinglePlace";
import { UserContextProvider } from "./UserContext";
axios.defaults.baseURL = "https://airbnb-clone-api-bewg.onrender.com/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/account/:subpage/:id" element={<AccountPage />} />
            <Route path="/place/:id" element={<SinglePlace />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
