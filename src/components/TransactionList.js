import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Transactions from "./Transactions";

function TransactionList() {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(el => (
          <Transactions key={el.id} el={el} />
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
