import React from "react";
import { useSelector } from "react-redux";
import thousandSeparator from "../utils/thousandSeparator";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transactions);

  let totalIncome = 0;
  let totalExpense = 0;

  transactions?.length > 0 &&
    transactions.map((transaction) =>
      transaction.type === "income"
        ? (totalIncome += Number(transaction.amount))
        : (totalExpense += Number(transaction.amount))
    );
    let balance = totalIncome - totalExpense;
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{transactions?.length > 0 ? thousandSeparator(balance) : 0}</span>
      </h3>
    </div>
  );
};

export default Balance;
