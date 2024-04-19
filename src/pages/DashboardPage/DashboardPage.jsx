import s from './DashboardPage.module.css';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';

const MainDashboardPage = () => {
  const emptyBoardAddButtonTitle = 'Add another column';
  return (
    <div className="container">
      <DashboardHeader />
      <button className={s.addColBtn}>
        <AddButton color="light" width={28} height={28} iconSize={14} />
        {emptyBoardAddButtonTitle}
      </button>
    </div>
  );
};

export default MainDashboardPage;
