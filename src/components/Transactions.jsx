import React from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "../features/transaction/transactionSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  //decide what to render
  let content;
  if (isLoading) content = <div>Transactions are loading...</div>;

  if (!isLoading && isError) content = <div>{error}</div>;

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <div>No transactions found!</div>;
  }

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={new Date().getTime() + transaction.id} transaction={transaction} />
    ));
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
