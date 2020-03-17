import React, { useState, useContext } from "react";

import { GlobalContext } from "../context/GlobalContext";
function AddTransaction() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);

  const textChange = e => {
    setText(e.target.value);
  };
  const amountChange = e => {
    setAmount(e.target.value);
  };

  const Submit = e => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 10000000),
      text,
      amount: +amount
    };
    setAmount(0);
    setText("");

    addTransaction(newTransaction);
  };
  return (
    <>
      <h3>Add a new Transaction</h3>
      <form onSubmit={Submit}>
        <div className="form-control">
          <label htmlFor="text">Name your transaction</label>
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={textChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            placeholder="Enter amount...."
            value={amount}
            onChange={amountChange}
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
}

export default AddTransaction;
