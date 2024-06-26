import classNames from 'classnames';

import { Icon } from 'components';

import s from './AddButton.module.css';

export const AddButton = ({ color = 'dark', width, height, iconSize }) => {
  const spanClass = color => {
    return classNames({
      [`${s.iconWrapper}`]: true,
      [`${s.dark}`]: color === 'dark',
      [`${s.light}`]: color === 'light',
      [`${s.green}`]: color === 'green',
      [`${s.boardCreate}`]: color === 'boardCreate',
    });
  };

  return (
    <span className={spanClass(color)} style={{ width, height }}>
      <Icon id="plus" className={s.iconPlus} size={iconSize} />
    </span>
  );
};
