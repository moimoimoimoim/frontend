import "./Sidebar.css";
import addGroup from "../../assets/group-add.png";
import { NavLink } from "react-router-dom";
import { useRef, useEffect } from "react";
// import React, { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const outside = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      const menuIcon = document.querySelector(".menu-icon"); //menu-icon 찾기

      // menu-icon을 클릭하면 toggleSidebar() 실행되도록 예외처리
      if (
        isOpen &&
        outside.current &&
        !outside.current.contains(event.target) &&
        event.target !== menuIcon
      ) {
        toggleSidebar();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <aside ref={outside} className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar__content">
        <ul>
          <h3 className="category-title">모임 관리</h3>
          <li>
            <a href="#">모든 모임</a>
          </li>
          <li>
            <a href="#">진행 중인 모임</a>
          </li>
          <li>
            <a href="#">마감된 모임</a>
          </li>
        </ul>
        <ul>
          <h3 className="category-title">그룹 관리</h3>
          <li className="addGroup">
            <img src={addGroup} className="addGroup-icon" alt="그룹 추가" />
            <span>그룹 추가</span>
          </li>
          <li>
            <a href="#">스터디</a>
          </li>
          <li>
            <a href="#">서미갱스터</a>
          </li>
          <li>
            <a href="#">창의학기제</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
