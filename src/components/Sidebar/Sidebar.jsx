import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import s from './Sidebar.module.css';
import { Icon } from '../Icon/Icon';
import flower from '../../assets/images/flower.png';

const Sidebar = () => {
  const { setTheme } = useTheme();
  return (
    <aside className={s.SidebarBlock}>
      <h1 className={s.TitleHidden}>Task boards page</h1>
      <NavLink className={s.NavLogo} to="/">
        <Icon id="logo" className={s.SvgLightning} size={18} />
        <p className={s.Title}>Task Pro</p>
      </NavLink>
      <div className={s.Section}>
        <h2 className={s.MyBoardTitle}>My boards</h2>

        <div className={s.BoardTitleBlock}>
          <p>Create a new board</p>
          <button className={s.ButtonAdd} aria-label="add" type="button">
            <Icon id="plus" className={s.SvgPlus} size={18} />
          </button>
        </div>

        <div className={s.MainBoard}>
          <ul>
            <li className={s.BoardList}>
              <NavLink className={s.Nav} to="">
                <div className={s.TitleBoard}>
                  <Icon id="close" className={s.SvgLightning} size={18} />
                  <p className={s.BoardTitle}>Project office</p>
                </div>

                <div className={s.BoardIcons}>
                  <button
                    className={s.ButtonIcon}
                    type="button"
                    aria-label="edit"
                  >
                    <Icon id="close" className={s.EditIcon} size={18} />
                  </button>
                  <button
                    className={s.ButtonIcon}
                    type="button"
                    aria-label="delete"
                  >
                    <Icon id="close" className={s.EditIcon} size={18} />
                  </button>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.NeedHelpBlock}>
        <img
          className={s.Flower}
          src={flower}
          alt="flower"
          width={54}
          height={78}
        />
        <p className={s.HelpContent}>
          If you need help with <span>TaskPro</span>, check out our support
          resources or reach out to our customer support team.
        </p>
        <button className={s.NeedHelpButton} type="button" name="help">
          <Icon id="close" className={s.SvgHelp} size={18} />
          Need help?
        </button>
      </div>

      <button type="button" name="logout">
        <Icon id="close" className={s.SvgLogout} size={18} />
        Log out
      </button>
    </aside>
  );
};

// const Sidebar = () => {
//   return <h1>SIDEBAR</h1>;
// };

export default Sidebar;
