import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Header from "../header/Header";
import SideBar from "../Sidebar/SideBar";
import style from "./style.module.scss";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={style.parent}>
      <SideBar />
      <div className={style.hoc}>
        <Header />
        <main className={style.content_box}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
