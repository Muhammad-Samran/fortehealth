import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaBed,
  FaHireAHelper,
  FaHome,
  FaLock,
  FaMobile,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa";
import {
  MdDashboardCustomize,
  MdMessage,
  MdPolicy,
  MdVideoLibrary,
} from "react-icons/md";
import { BiAnalyse, BiSearch, BiVideo } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import {
  IoCreate,
  IoLogoGooglePlaystore,
  IoSettingsSharp,
} from "react-icons/io5";
import { AiFillHeart, RiHotelBedLine } from "react-icons/ri";
import {
  BsApple,
  BsCartCheck,
  BsTelephoneFill,
  BsTelephoneForward,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Hamburger from "../../assets/Icons/Hamburger.svg";
import { AiFillFund, AiFillMobile, AiOutlineAudit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { ReactComponent as Create } from "../../assets/sidebar_icons/Create.png";

const superRoutes = [
  {
    path: "/superuser/dashboard",
    name: "Dashboard",
    icon: <MdDashboardCustomize />,
  },
  {
    path: "/audit",
    name: "Create Audit",
    icon: <AiFillFund />,
  },
  {
    path: "/auditResult",
    name: "Completed Audit",
    icon: <AiOutlineAudit />,
  },
  {
    path: "/addward",
    name: "Add Ward",
    icon: <FaBed />,
  },
  {
    path: "/createusers",
    name: "Create Users",
    icon: <IoCreate />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/tutorials",
    name: "Tutorials",
    icon: <MdVideoLibrary />,
  },
  // {
  //   path: "/tutorials",
  //   name: "Tutorials",
  //   icon: <IoLogoGooglePlaystore />,
  // },
  {
    path: "/help",
    name: "Mobile Apps",
    icon: <FaMobile />,
    subRoutes: [
      {
        path: "//apps.apple.com/us/app/forte-healthcare/id6443988362",
        name: "App Store",
        icon: <BsApple />,
      },
      {
        path: "//play.google.com/store/apps/details?id=com.fortehealthcare&pli=1",
        name: "Play Store",
        icon: <IoLogoGooglePlaystore />,
      },
    ],
  },
  {
    path: "/help",
    name: "Help",
    icon: <FaHireAHelper />,
    subRoutes: [
      {
        path: "/help/contact",
        name: "Contact us ",
        icon: <BsTelephoneFill />,
      },
      {
        path: "/help/faq",
        name: "Faq’s",
        icon: <FaLock />,
      },
      {
        path: "/help/conditions",
        name: "Terms and Conditions",
        icon: <FaMoneyBill />,
      },
      {
        path: "/help/privacypolicy",
        name: "Privacy policy",
        icon: <MdPolicy />,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsSharp />,
    // exact: true,
    subRoutes: [
      {
        path: "/setting/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      // {
      //   path: "/settings/2fa",
      //   name: "Sign Out",
      //   icon: <FaLock />,
      // },
    ],
  },
];

const userRoutes = [
  {
    path: "/auditperform",
    name: "Audit To Perform",
    icon: <FaHome />,
  },
  {
    path: "/auditResult",
    name: "Completed Audit",
    icon: <AiOutlineAudit />,
  },
  {
    path: "/addward",
    name: "Add Ward",
    icon: <FaBed />,
  },
  {
    path: "/tutorials",
    name: "Tutorials",
    icon: <MdVideoLibrary />,
  },
  // {
  //   path: "/tutorials",
  //   name: "Tutorials",
  //   icon: <IoLogoGooglePlaystore />,
  // },
  {
    path: "/help",
    name: "Mobile Apps",
    icon: <FaMobile />,
    subRoutes: [
      {
        path: "//apps.apple.com/us/app/forte-healthcare/id6443988362",
        name: "App Store",
        icon: <BsApple />,
      },
      {
        path: "//play.google.com/store/apps/details?id=com.fortehealthcare&pli=1",
        name: "Play Store",
        icon: <IoLogoGooglePlaystore />,
      },
    ],
  },
  {
    path: "/help",
    name: "Help",
    icon: <FaHireAHelper />,
    subRoutes: [
      {
        path: "/help/contact",
        name: "Contact us ",
        icon: <BsTelephoneFill />,
      },
      {
        path: "/help/faq",
        name: "Faq’s",
        icon: <FaLock />,
      },
      {
        path: "/help/conditions",
        name: "Terms and Conditions",
        icon: <FaMoneyBill />,
      },
      {
        path: "/help/privacypolicy",
        name: "Privacy policy",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    // exact: true,
    subRoutes: [
      {
        path: "/setting/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      // {
      //   path: "/settings/2fa",
      //   name: "Sign Out",
      //   icon: <FaLock />,
      // },
    ],
  },
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  let navigate = useNavigate();
  const toggle = () => {
    if (windowDimensions.width < 768) {
      setIsOpen(!isOpen);
    }
  };
  const currentUser = useSelector((state) => state.auth);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const initialRoute = () => {
    if (currentUser?.user?.role == "super_user") {
      return navigate(superRoutes[0]?.path);
    } else if (currentUser?.user?.role == "user") {
      return navigate(userRoutes[0]?.path);
    }
  };

  useEffect(() => {
    initialRoute();
  }, []);

  useEffect(() => {
    if (windowDimensions.width > 767) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [windowDimensions.width]);

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Forte Health
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <img src={Hamburger} onClick={toggle} />
              {/* <FaBars  /> */}
            </div>
          </div>
          <section className="routes">
            {(currentUser?.user?.role == "super_user"
              ? superRoutes
              : userRoutes
            )?.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    toggle={toggle}
                  />
                );
              }

              return (
                <>
                  {" "}
                  {index === 0 ? initialRoute : null}
                  <NavLink
                    to={route.path}
                    isActive={index === 0 ? true : false}
                    key={index}
                    className="link"
                    activeClassName="active"
                    onClick={toggle}
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
