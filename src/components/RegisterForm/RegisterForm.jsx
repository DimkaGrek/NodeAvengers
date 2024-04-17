import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import s from "./RegisterForm.module.css";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
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
        <p className={s.text}>Registration</p>
        <Link className={s.link_login} to="/auth/login">
          Log In
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <input
          placeholder="Enter your name"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <input
          placeholder="Enter your email"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          placeholder="Create a password"
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button className={s.btn_submit} type="submit">
          Register Now
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
