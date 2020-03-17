import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext";
import { numberWithCommas } from "../helpers/format";

function IncomeExpenses() {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(el => el.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, current) => (acc += current), 0);

  const expense =
    amounts
      .filter(item => item < 0)
      .reduce((acc, current) => (acc += current), 0) * -1;
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">Ksh{numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">Ksh{numberWithCommas(expense)}</p>
      </div>
    </div>
  );
}

export default IncomeExpenses;
