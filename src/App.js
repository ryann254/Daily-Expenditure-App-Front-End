import React from "react";
import "./App.css";

//Own Components
import {
  Header,
  Balance,
  IncomeExpenses,
  TransactionList,
  AddTransaction
} from "./components";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
