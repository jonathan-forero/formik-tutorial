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

const BasicForm = () => {
  return (
    <>
      <h1>A Basic Formik Form</h1>
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

export default BasicForm;
