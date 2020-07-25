import React from "react";
import BasicForm from "./components/BasicForm";
import ComplexForm from "./components/ComplexForm";

const App = () => (
  <div className="container">
    <h1>Formik POC</h1>
    <BasicForm />
    <ComplexForm />
  </div>
);
export default App;
