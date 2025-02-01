import { useParams } from "react-router-dom";

const Group = () => {
  const { groupId } = useParams(); // ✅ URL에서 그룹 ID 가져오기

  return (
    <div>
      <h1>그룹 {groupId}</h1>
      <p>이 페이지는 그룹 {groupId}에 대한 정보입니다.</p>
    </div>
  );
};

export default Group;
