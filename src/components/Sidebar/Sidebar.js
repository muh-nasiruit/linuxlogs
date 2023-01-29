import React from 'react'
import SidebarCSS from './Sidebar.module.css';
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { FaBuromobelexperte } from "react-icons/fa";
import { FaFirstdraft } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

const Sidebar = ()=> {

  const navigate = useNavigate();
  return (
        <div id="mySidebar" className={SidebarCSS.sidebar}>
        <span onClick={() => navigate("/dashboard")}>DRAW STACK</span>
        <div className={SidebarCSS.links}>
          <ul>
            <li>
                <span>
                    <FaUserFriends />
                </span>
              <a href="# " onClick={() => navigate("/users")}>Users</a>
            </li>
            <li>
                <span>
                    <FaBuromobelexperte />
                </span>
              <a href="# " onClick={() => navigate("/data-management")}>Data Management</a>
            </li>
            <li>
                <span>
                    <FaFirstdraft />
                </span>
              <a href="# " onClick={() => navigate("/data-analysis")}>Data Analysis</a>
            </li>
            <li>
                <span>
                    <FaCopy/>
                </span>
              <a href="# " onClick={() => navigate("/reports")}>Reports</a>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default Sidebar