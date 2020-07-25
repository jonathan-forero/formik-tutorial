import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./styles.css";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const validationDefinitions = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const handleSubmit = (values, setSubmitting) => {
  alert(JSON.stringify(values));
  setSubmitting(false);
};

const App = () => {
  return (
    <>
      <h1>A Formik Form</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validate={validationDefinitions}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {(formProps) => {
          const { isSubmitting } = formProps;
          return (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default App;
