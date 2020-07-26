import React from "react";
import BasicForm from "./components/BasicForm";
import ComplexForm from "./components/ComplexForm";
import DynamicForm from "./components/DynamicForm";

const App = () => (
  <div className="container">
    <h1>Formik POC</h1>
    <BasicForm />
    <ComplexForm />
    <DynamicForm />
  </div>
);
export default App;
