import s from "./RegisterForm.module.css";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Your name should be 2 or more characters.")
    .max(32, "Your name should not be more than 32 characters.")
    .required("This field is required."),
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

export const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const passVisibility = () => {
    setShowPass((prevState) => !prevState);
  };
  return (
    <div className={s.form_wrapper}>
      <div className={s.inside_wrapper}>
        <p className={s.text}>Registration</p>
        <Link className={s.link_login} to="/auth/login">
          Log In
        </Link>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          password: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <div>
              <Field
                name="firstName"
                placeholder="Enter your name"
                type="text"
              />
              {errors.firstName && touched.firstName ? (
                <div className={s.input_error}>{errors.firstName}</div>
              ) : null}
            </div>
            <div>
              <Field name="email" type="email" placeholder="Enter your email" />
              {errors.email && touched.email ? (
                <div className={s.input_error}>{errors.email}</div>
              ) : null}
            </div>
            <div className={s.pass_input_wrapper}>
              <Field
                placeholder="Create a password"
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
            <Button className={s.btn_submit} type="submit">
              Register Now
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
