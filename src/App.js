import React from "react";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Layout from "./components/Layout";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Transactions from "./components/Transactions";

const options = {
  timeout: 4000,
};

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Layout>
        <Balance />
        <Form />
        <Transactions />
      </Layout>
    </AlertProvider>
  );
}

export default App;
