import React, { useContext } from "react";
import { numberWithCommas } from "../helpers/format";

import { GlobalContext } from "../context/GlobalContext";
function Transactions({ el }) {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = el.amount > 0 ? "+" : "-";
  return (
    <li className={el.amount > 0 ? "plus" : "minus"}>
      {el.text}
      <span>
        {sign} Ksh {numberWithCommas(Math.abs(el.amount))}
      </span>
      <button className="delete-btn" onClick={() => deleteTransaction(el._id)}>
        x
      </button>
    </li>
  );
}

export default Transactions;
