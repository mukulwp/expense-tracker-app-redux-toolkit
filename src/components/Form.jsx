import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
} from "../features/transaction/transactionSlice";
import { useEffect } from "react";
import { types, useAlert } from "react-alert";

const Form = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, success, error } = useSelector(
    (state) => state.transactions
  );
  const { editing } = useSelector((state) => state.transactions || {});
  const [data, setData] = useState({
    name: "",
    type: "income",
    amount: "",
  });
  const { name, type, amount } = data;

  const [editMode, setEditMode] = useState(false);

   //listen for edit mode active
   useEffect(() => {
    const { id, name, type, amount } = editing || {};

    if (id) {
      setEditMode(true);
      setData({
        name,
        type,
        amount,
      });
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [editing]);

  const resetForm = () => {
    setData({
      name: "",
      amount: "",
      type: "income",
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    dispatch(createTransaction({ name, type, amount: Number(amount) }));

    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name,
          amount,
          type,
        },
      })
    );
    setEditMode(false);
    resetForm();
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
    resetForm();
  };


  //alert message
  useEffect(() => {
    if (!isLoading && isError && !isSuccess) {
      alert.show(error, {
        type: types.ERROR,
      });
    }

    if (!isLoading && !isError && isSuccess) {
      alert.show(success, {
        type: types.SUCCESS,
      });
    }
  }, [isLoading, isError, alert, isSuccess, success, error]);
  return (
    <div className="form">
      <h3>{editMode ? "Update transaction" : "Add new transaction"}</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            required
            type="text"
            name="transaction_name"
            placeholder="Enter Title"
            id="transaction_name"
            value={name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="transaction_type"
              id="income"
              checked={type === "income"}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="transaction_type"
              placeholder="Expense"
              id="transaction_type"
              checked={type === "expense"}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            required
            type="number"
            placeholder="Enter Amount"
            name="transaction_amount"
            id="transaction_amount"
            value={amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={handleCancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
