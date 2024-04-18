import Button from "../../components/Button/Button";
import s from "./LoginForm.module.css";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Icon } from "../Icon/Icon";
import { Link, useNavigate } from "react-router-dom";

const LoginFormShema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Your password should be 8 or more characters.")
    .max(64, "Your password should not be more than 64 characters.")
    .matches(/^\S*$/, "Your password should not contain spaces.")
    .required("This field is required."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
      "Email is not valid."
    )
    .required("This field is required."),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const passVisibility = () => {
    setShowPass((prevState) => !prevState);
  };
  return (
    <div className={s.form_wrapper}>
      <div className={s.inside_wrapper}>
        <Link className={s.link_register} to="/auth/register">
          Registration
        </Link>
        <p className={s.text}>Log In</p>
      </div>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={LoginFormShema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <div>
              <Field name="email" type="email" placeholder="Enter your email" />
              {errors.email && touched.email ? (
                <div className={s.input_error}>{errors.email}</div>
              ) : null}
            </div>
            <div className={s.pass_input_wrapper}>
              <Field
                placeholder="Confirm a password"
                name="password"
                type={showPass ? "text" : "password"}
              />
              {errors.password && touched.password ? (
                <div className={s.input_error}>{errors.password}</div>
              ) : null}
              <Button
                type="button"
                className={s.eyeIconBtn}
                onClick={passVisibility}
              >
                {showPass ? (
                  <Icon id="eye" className={s.icon} size={18} />
                ) : (
                  <Icon id="eye-off" className={s.icon} size={18} />
                )}
              </Button>
            </div>
            <Button
              className={s.btn_submit}
              type="submit"
              onClick={() => navigate("/home")}
            >
              Log In Now
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
