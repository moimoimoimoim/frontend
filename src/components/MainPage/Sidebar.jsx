import "./Sidebar.css";
import addGroup from "../../assets/group-add.png";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const outside = useRef(null); //사이드바 요소 참조

  const [groups, setGroups] = useState([{ id: 1, name: "기본 그룹" }]); // 기본 그룹 리스트
  const [groupName, setGroupName] = useState(""); // 사용자 입력을 저장할 state

  // 새 그룹 추가 함수
  const addNewGroup = () => {
    if (!groupName.trim()) return; // 빈 입력 방지
    const newGroupId = groups.length + 1;
    const newGroup = { id: newGroupId, name: groupName };
    setGroups([...groups, newGroup]); // 그룹 리스트에 추가
    setGroupName(""); // 입력창 초기화
  };

  //사이드바 외부 클릭 시 닫힘
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
        toggleSidebar(); //사이드바닫기
      }
    }

    //클릭이벤트리스너
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    //사이드바 컨테이너 -> isOpen 상태에 따라 open 클래스 추가
    <aside ref={outside} className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar__content">
        <ul>
          <h3 className="category-title">모임 관리</h3>
          <li>
            <Link to="/main/all-meetings" onClick={toggleSidebar}>
              모든 모임
            </Link>
          </li>
          <li>
            <Link to="/main/ongoing-meetings" onClick={toggleSidebar}>
              진행 중인 모임
            </Link>
          </li>
          <li>
            <Link to="/main/closed-meetings" onClick={toggleSidebar}>
              마감된 모임
            </Link>
          </li>
        </ul>
        <ul>
          <h3 className="category-title">그룹 관리</h3>
          {/* 사용자 입력 필드 추가 */}
          <li className="addGroup-container">
            <form
              className="addGroup-form"
              onSubmit={(e) => {
                e.preventDefault();
                addNewGroup();
              }}
            >
              <div className="addGroup-submit">
                <input
                  type="text"
                  placeholder="새로운 그룹을 추가해보세요"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <img
                  src={addGroup}
                  className="addGroup-icon"
                  alt="그룹 추가"
                  onClick={addNewGroup}
                />
              </div>
            </form>
          </li>

          {groups.map((group) => (
            <li key={group.id}>
              <Link to={`/main/group/${group.id}`} onClick={toggleSidebar}>
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

//백엔드연결결용 코드
// import "./Sidebar.css";
// import addGroup from "../../assets/group-add.png";
// import { Link } from "react-router-dom";
// import { useRef, useEffect, useState } from "react";
// import axios from "axios"; // ✅ axios 추가

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const outside = useRef(null); // 사이드바 요소 참조

//   const [groups, setGroups] = useState([{ id: 1, name: "기본 그룹" }]); // 기본 그룹 리스트
//   const [groupName, setGroupName] = useState(""); // ✅ 사용자 입력을 저장할 state

//   // ✅ 1. 백엔드에서 그룹 목록 불러오기
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/groups") // ✅ 백엔드 API 주소
//       .then((response) => {
//         setGroups(response.data); // 서버에서 받아온 데이터를 상태로 설정
//       })
//       .catch((error) => {
//         console.error("그룹 데이터를 불러오는 중 오류 발생:", error);
//       });
//   }, []);

//   // ✅ 2. 새 그룹 추가 함수 (백엔드 저장)
//   const addNewGroup = () => {
//     if (!groupName.trim()) return; // 빈 입력 방지

//     // 새 그룹 데이터
//     const newGroup = { name: groupName };

//     axios
//       .post("http://localhost:5000/groups", newGroup) // ✅ 백엔드에 데이터 저장
//       .then((response) => {
//         setGroups([...groups, response.data]); // 서버에서 추가된 데이터 받아와서 업데이트
//         setGroupName(""); // 입력창 초기화
//       })
//       .catch((error) => {
//         console.error("새 그룹 추가 중 오류 발생:", error);
//       });
//   };

//   // ✅ 3. 그룹 삭제 함수 (백엔드 삭제 요청)
//   const deleteGroup = (groupId) => {
//     axios
//       .delete(`http://localhost:5000/groups/${groupId}`) // ✅ 삭제 요청
//       .then(() => {
//         setGroups(groups.filter((group) => group.id !== groupId)); // ✅ 상태에서 삭제
//       })
//       .catch((error) => {
//         console.error("그룹 삭제 중 오류 발생:", error);
//       });
//   };

//   // ✅ 사이드바 외부 클릭 시 닫힘
//   useEffect(() => {
//     function handleClickOutside(event) {
//       const menuIcon = document.querySelector(".menu-icon");
//       if (
//         isOpen &&
//         outside.current &&
//         !outside.current.contains(event.target) &&
//         event.target !== menuIcon
//       ) {
//         toggleSidebar();
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, toggleSidebar]);

//   return (
//     <aside ref={outside} className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="sidebar__content">
//         <ul>
//           <h3 className="category-title">모임 관리</h3>
//           <li>
//             <Link to="/main/all-meetings" onClick={toggleSidebar}>
//               모든 모임
//             </Link>
//           </li>
//           <li>
//             <Link to="/main/ongoing-meetings" onClick={toggleSidebar}>
//               진행 중인 모임
//             </Link>
//           </li>
//           <li>
//             <Link to="/main/closed-meetings" onClick={toggleSidebar}>
//               마감된 모임
//             </Link>
//           </li>
//         </ul>
//         <ul>
//           <h3 className="category-title">그룹 관리</h3>
//           {/* ✅ 사용자 입력 필드 추가 */}
//           <li className="addGroup-container">
//             <form
//               className="addGroup-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 addNewGroup();
//               }}
//             >
//               <div className="addGroup-submit">
//                 <input
//                   type="text"
//                   placeholder="새로운 그룹을 추가해보세요"
//                   value={groupName}
//                   onChange={(e) => setGroupName(e.target.value)}
//                 />
//                 <img
//                   src={addGroup}
//                   className="addGroup-icon"
//                   alt="그룹 추가"
//                   onClick={addNewGroup}
//                 />
//               </div>
//             </form>
//           </li>

//           {groups.map((group) => (
//             <li key={group.id}>
//               <Link to={`/main/group/${group.id}`} onClick={toggleSidebar}>
//                 {group.name}
//               </Link>
//               <button onClick={() => deleteGroup(group.id)}>🗑</button> {/* ✅ 삭제 버튼 추가 */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
