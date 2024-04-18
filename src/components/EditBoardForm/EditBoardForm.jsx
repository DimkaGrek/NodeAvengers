import * as Yup from "yup";

import Button from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { AddButton } from "../AddButton/AddButton";

import { getImages } from "../../helpers/getImages";

import s from "./EditBoardForm.module.css";

const Schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Your title should be 8 or more characters.")
    .max(64, "Your title should not be more than 64 characters.")
    .required("This field is required."),
});

export const EditBoardForm = ({ isEdit = false }) => {
  const { images, icons } = getImages();

  return (
    <form className={s.form}>
      <input className={s.input} type="text" placeholder="Title" />
      <div className={s.wrapper}>
        <p className={s.description}>Icons</p>
        <ul className={s.iconList}>
          {icons.map((icon, index) => (
            <li key={index}>
              <label>
                <input
                  className={s.radioBtn}
                  type="radio"
                  name="icon"
                  value={index}
                  defaultChecked={index === 0}
                />
                <Icon id={icon} className={s.icon} size={18} />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.wrapper}>
        {" "}
        <p className={s.description}>Background</p>
        <ul className={s.imageList}>
          {images.map((image, index) => (
            <li key={index}>
              <label>
                <input
                  className={s.radioBtn}
                  type="radio"
                  name="image"
                  value={index}
                  defaultChecked={index === 0}
                />
                <img
                  className={s.img}
                  src={image}
                  alt="background"
                  width={28}
                  height={28}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <Button type="submit" className={s.button}>
        <AddButton width={28} height={28} iconSize={18} />
        Create
      </Button>
    </form>
  );
};
