import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useOutletContext();
  const name = userData.username;
  return (
    <div className="container">
      <div>Welcome to your Dashboard.</div>{" "}
      <a href={`/${name}/new-post`}>New Post</a>
    </div>
  );
};

export default Dashboard;
