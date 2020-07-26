import React, { useState } from "react";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";

const validationSchemaA = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string()
    .required("Required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  jobType: Yup.string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
});

const validationSchemaB = Yup.object().shape({
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  jobType: Yup.string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
});

const validationSchemaC = Yup.object().shape({
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  acceptedTerms: false,
  jobType: "",
  formType: "typeA",
};

const isCurrentType = (key, formType) =>
  formDefinitions.find((obj) => obj.name === key).type.includes(formType);

const handleSubmit = (values, setSubmitting, formType) => {
  setTimeout(() => {
    const formData = {
      firstName: isCurrentType("firstName", formType) ? values.firstName : null,
      lastName: isCurrentType("lastName", formType) ? values.lastName : null,
      email: isCurrentType("email", formType) ? values.email : null,
      acceptedTerms: isCurrentType("terms", formType)
        ? values.acceptedTerms
        : null,
      jobType: isCurrentType("jobType", formType) ? values.jobType : null,
    };
    alert(JSON.stringify(formData, null, 2));
    setSubmitting(false);
  }, 2000);
};

// My Custom Inputs Components
const ErrorContainer = (props) => (
  <div className="error-message">{props.children}</div>
);

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorContainer>{meta.error}</ErrorContainer>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorContainer>{meta.error}</ErrorContainer>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// definitions
const formDefinitions = [
  {
    name: "formType",
    type: ["typeA", "typeB", "typeC"],
    render: (resetForm, setFormType) => (
      <MySelect
        onChange={(e) => {
          setFormType(e.target.value);
          resetForm();
        }}
        label="Form Type"
        name="type"
      >
        <option value="typeA">A</option>
        <option value="typeB">B</option>
        <option value="typeC">C</option>
      </MySelect>
    ),
  },
  {
    name: "firstName",
    type: ["typeA"],
    render: () => (
      <MyTextInput
        key="firstNameKey"
        label="First Name"
        name="firstName"
        type="text"
        placeholder="John"
      />
    ),
  },
  {
    name: "lastName",
    type: ["typeB"],
    render: () => (
      <MyTextInput
        key="lastNameKey"
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Doe"
      />
    ),
  },
  {
    name: "email",
    type: ["typeA"],
    render: () => (
      <MyTextInput
        key="email"
        label="Email Address"
        name="email"
        type="email"
        placeholder="jane@formik.com"
      />
    ),
  },
  {
    name: "jobType",
    type: ["typeA", "typeB"],
    render: () => (
      <MySelect label="Job Type" name="jobType" key="jobType">
        <option value="">Select a job type</option>
        <option value="designer">Designer</option>
        <option value="development">Developer</option>
        <option value="product">Product Manager</option>
        <option value="other">Other</option>
      </MySelect>
    ),
  },
  {
    name: "terms",
    type: ["typeA", "typeB", "typeC"],
    render: () => (
      <MyCheckbox name="acceptedTerms" key="terms">
        I accept the terms and conditions
      </MyCheckbox>
    ),
  },
];

const DynamicForm = () => {
  const [formType, setFormType] = useState("typeA");

  const getValidationSchema = () => {
    switch (formType) {
      case "typeA":
        return validationSchemaA;
      case "typeB":
        return validationSchemaB;
      default:
        return validationSchemaC;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting, formType);
      }}
      validationSchema={getValidationSchema}
    >
      {(formik) => {
        const { isSubmitting, resetForm } = formik;
        return (
          <div className="form-container">
            <h2>Dynamic Formik Form</h2>
            <Form>
              {formDefinitions.map((formItem) => {
                return formItem.name === "formType"
                  ? formItem.render(resetForm, setFormType)
                  : formItem.type.includes(formType) && formItem.render();
              })}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default DynamicForm;
