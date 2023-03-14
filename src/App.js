import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";

import CreateAudit from "./components/createaudit/CreateAudit";
import AddWard from "./components/addward/AddWard";
import Users from "./components/users/Users";
import Home from "./components/home/Home";
import Contact from "./components/Help/contact/Contact";
import Faq from "./components/Help/faq/faqs/Faq";
import Forget from "./components/forget/Forget";
import CreateUser from "./components/createuser/CreateUser";
import TermsConditions from "./components/Help/terms&conditions/TermsConditions";
import PrivacyPolicy from "./components/Help/privacypolicy/PrivacyPolicy";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Main";
import AuditPerform from "./components/userside_screens/auditperform/AuditPerform";
import Tutorial from "./components/tutorials/Tutorial";
import Verification from "./components/forget/codeverification/Verification";
import ResetPassword from "./components/forget/reset-password/ResetPassword";

import { logout } from "./redux/slices/authSlice";
import NotFound from "./components/notFound/NotFound";
import EventBus from "./common/EventBus";
import AuthVerify from "./common/AuthVerify";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AuditDetail from "./components/userside_screens/AuditDetail/AuditDetail";
import AuditResult from "./components/auditResult/AuditResult";

function App() {
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [showSuperBoard, setShowSuperBoard] = useState(false);

  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.isLoggedIn) {
      setShowUserBoard(currentUser?.user?.role?.includes("user"));
      setShowSuperBoard(currentUser?.user?.role?.includes("super_user"));
    } else {
      setShowUserBoard(false);
      setShowSuperBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <Routes>
        <Route
          path={routes.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {showSuperBoard && (
            <>
              <Route
                path={routes.DASHBOARD_SUPER_USER}
                element={<Dashboard />}
              />
              <Route path={routes.AUDIT} element={<CreateAudit />} />
              <Route path={routes.AUDITRESULTS} element={<AuditResult />} />
              <Route path={routes.ADDWARD} element={<AddWard />} />
              <Route path={routes.CREATEUSERS} element={<CreateUser />} />
              <Route path={routes.USERS} element={<Users />} />
              <Route path={routes.TUTORIALS} element={<Tutorial />} />
              <Route path={routes.CONTACTUS} element={<Contact />} />
              <Route path={routes.FAQS} element={<Faq />} />
              <Route path={routes.CONDITIONS} element={<TermsConditions />} />
              <Route path={routes.PRIVACYPOLICY} element={<PrivacyPolicy />} />
              <Route path={routes.PROFILE} element={<Profile />} />
              <Route path={routes.AUDITPERFORM} element={<AuditPerform />} />
            </>
          )}
          {showUserBoard && (
            <>
              {/* <Route path={routes.DASHBOARD_USER} element={<Dashboard />} /> */}
              <Route path={routes.AUDITPERFORM} element={<AuditPerform />} />
              <Route path={routes.AUDIT_DETAIL} element={<AuditDetail />} />
              <Route path={routes.AUDITRESULTS} element={<AuditResult />} />
              <Route path={routes.ADDWARD} element={<AddWard />} />
              <Route path={routes.USERS} element={<Users />} />
              <Route path={routes.TUTORIALS} element={<Tutorial />} />
              <Route path={routes.CONTACTUS} element={<Contact />} />
              <Route path={routes.FAQS} element={<Faq />} />
              <Route path={routes.CONDITIONS} element={<TermsConditions />} />
              <Route path={routes.PRIVACYPOLICY} element={<PrivacyPolicy />} />
              <Route path={routes.PROFILE} element={<Profile />} />
            </>
          )}
        </Route>
        {/* Login */}
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.FORGET_PASSWORD} element={<Forget />} />
        <Route path={routes.VERIFICATION_CODE} element={<Verification />} />
        <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
