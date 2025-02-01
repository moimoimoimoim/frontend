import "./Sidebar.css";
import addGroup from "../../assets/group-add.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar__content">
        <ul>
          <div>모임 관리</div>
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
          <div>그룹 관리</div>
          <img src={addGroup} className="addGroup-icon" alt="그룹 추가"></img>
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
    </div>
  );
};

export default Sidebar;
