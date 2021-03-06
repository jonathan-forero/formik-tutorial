import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const VALIDATIONS = {
  REQUIRED: "Value Required",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(VALIDATIONS.REQUIRED)
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
  password: Yup.string().required(VALIDATIONS.REQUIRED),
});

const handleSubmit = (values, setSubmitting) => {
  alert(JSON.stringify(values));
  setSubmitting(false);
};

const errorContainer = (props) => (
  <div className="error-message">{props.children}</div>
);

const BasicForm = () => {
  return (
    <div className="form-container">
      <h2>A Basic Formik Form</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {(formProps) => {
          const { isSubmitting } = formProps;
          return (
            <Form>
              <label htmlFor="email">Email Address</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component={errorContainer} />

              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component={errorContainer} />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BasicForm;
