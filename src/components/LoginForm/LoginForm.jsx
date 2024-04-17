import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import s from "./LoginForm.module.css";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className={s.form_wrapper}>
      <div className={s.inside_wrapper}>
        <Link className={s.link_register} to="/auth/register">
          Registration
        </Link>
        <p className={s.text}>Log In</p>
      </div>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <input
          placeholder="Enter your email"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          placeholder="Confirm a password"
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button className={s.btn_submit} type="submit">
          Log In Now
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
