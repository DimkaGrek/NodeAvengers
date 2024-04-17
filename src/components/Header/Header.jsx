import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.sectionStyleHeader}>
      <button className={styles.burgerButton}>
        <svg width="24px" height="24px" className={styles.burgerIconStyles}>
          <use href=""></use>
        </svg>
      </button>
      <p>Theme</p>
      <button className={styles.dropButton}>
        <svg width="10px" height="7px" className={styles.dropIconStyles}>
          <use href=""></use>
        </svg>
      </button>
      <ul className={styles.dropThemeList}>
        <li className={styles.itemTheme}>Light</li>
        <li className={styles.itemTheme}>Dark</li>
        <li className={styles.itemTheme}>Violet</li>
      </ul>
      <p className={styles.userName}>UserName</p>
      <img width="32" height="32" className={styles.avatarUser} />
    </header>
  );
};
