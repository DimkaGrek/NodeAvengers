import classNames from "classnames";
import { Icon } from "../Icon/Icon";

import s from "./AddButton.module.css";

export const AddButton = ({ color = "dark", width, height, iconSize }) => {
  const spanClass = (color) => {
    return classNames({
      [`${s.iconWrapper}`]: true,
      [`${s.dark}`]: color === "dark",
      [`${s.light}`]: color === "light",
      [`${s.green}`]: color === "green",
    });
  };

  return (
    <span className={spanClass(color)} style={{ width, height }}>
      <Icon id="plus" className={s.iconPlus} size={iconSize} />
    </span>
  );
};
