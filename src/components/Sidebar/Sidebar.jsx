import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import s from './Sidebar.module.css';
import { Icon } from 'components';
import flower from '../../assets/images/flower.png';
import { AddButton } from '../AddButton/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { selectRefreshToken } from '../../redux/auth/slice';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { setTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector(selectRefreshToken);
  const handleLogOut = async () => {
    try {
      await dispatch(logoutThunk({ refreshToken }));
      navigate('/welcome');
    } catch (error) {
      toast.error('Something went wront please try again.');
    }
  };
  return (
    <aside className={s.sideBarBlock}>
      <h1 className={s.titleHidden}>Task boards page</h1>
      <NavLink className={s.navLogo} to="/">
        <Icon
          id="logo"
          className={s.svgLightning}
          width={32}
          height={32}
          size={32}
        />
        <p className={s.title}>Task Pro</p>
      </NavLink>
      <div className={s.section}>
        <h2 className={s.myBoardTitle}>My boards</h2>

        <div className={s.boardTitleBlock}>
          <p className={s.boardTitle}>Create a new board</p>
          <button className={s.buttonAdd} aria-label="add" type="button">
            <Icon id="plus" className={s.svgPlus} size={20} />
          </button>
        </div>

        <div className={s.mainBoard}>
          <ul>
            <li className={s.boardList}>
              <NavLink className={s.nav} to="">
                <div className={s.titleBoard}>
                  <Icon id="project" className={s.svgProject} size={18} />
                  <p className={s.boardTitle}>Project office</p>
                </div>

                <div className={s.boardIcons}>
                  <button
                    className={s.buttonIcon}
                    type="button"
                    aria-label="edit"
                  >
                    <Icon id="pencil" className={s.editIcon} size={16} />
                  </button>
                  <button
                    className={s.buttonIcon}
                    type="button"
                    aria-label="delete"
                  >
                    <Icon id="trash" className={s.editIcon} size={16} />
                  </button>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.needHelpBlock}>
        <img
          className={s.flower}
          src={flower}
          alt="flower"
          width={54}
          height={78}
        />
        <p className={s.helpContent}>
          If you need help with <span>TaskPro</span>, check out our support
          resources or reach out to our customer support team.
        </p>
        <button className={s.needHelpButton} type="button" name="help">
          <Icon id="help-circle" className={s.svgHelp} size={20} />
          Need help?
        </button>
      </div>

      <button
        className={s.logoutBtn}
        type="button"
        name="logout"
        onClick={handleLogOut}
      >
        <Icon id="login" className={s.svgLogout} size={18} />
        Log out
      </button>
    </aside>
  );
};

// const Sidebar = () => {
//   return <h1>SIDEBAR</h1>;
// };

export default Sidebar;
