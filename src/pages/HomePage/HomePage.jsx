import { Link } from "react-router-dom";

const HomePage = () => {
  const boardName = "Project";
  return (
    <div>
      HomePage
      <Link to={boardName}>Board</Link>
    </div>
  );
};

export default HomePage;
