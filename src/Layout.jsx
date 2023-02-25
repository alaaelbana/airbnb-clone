import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Header from "./component/Header";

const Layout = () => {
  const { id } = useParams();
  const [layout, setLayout] = useState(false);
  useEffect(() => {
    setLayout(false);
    if (window.location.href === "http://localhost:5173/place/" + id)
      setLayout(true);
  }, [id]);
  return (
    <>
      <Header layout={layout} />
      <div
        className={`w-full mx-auto  px-4 ${
          layout ? "max-w-[1170px]" : "max-w-screen-2xl"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
