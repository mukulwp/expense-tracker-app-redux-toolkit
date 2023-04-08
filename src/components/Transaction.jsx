import React from "react";
import EditImg from "../images/edit.svg";
import DeleteImg from "../images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../features/transaction/transactionSlice";
import thousandSeparator from "../utils/thousandSeparator";

const Transaction = ({ transaction = {} }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure to delete this transaction?");

    if (confirm) {
      dispatch(removeTransaction(transaction.id));
    }
  };
  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {thousandSeparator(transaction.amount)}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={EditImg} alt="Edit" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={DeleteImg} alt="Delete" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
