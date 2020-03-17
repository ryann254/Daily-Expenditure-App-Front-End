import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { numberWithCommas } from "../helpers/format";

function Balance() {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(el => el.amount);
  const totalAmount = amounts
    .reduce((acc, current) => (acc += current), 0)
    .toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1>Ksh {numberWithCommas(totalAmount)}</h1>
    </>
  );
}

export default Balance;
