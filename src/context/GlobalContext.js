import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import {
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  TRANSACTION_ERROR
} from "./ActionTypes";

//Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const instance = axios.create({
    baseURL: "https://expense-tracker-backend-001.herokuapp.com",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    }
  });
  //Actions
  async function getTransactions() {
    try {
      const res = await instance.get(`/api/v1/transactions`);
      console.log(res);
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error
      });
    }
  }

  const deleteTransaction = async id => {
    try {
      await instance.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error
      });
    }
  };

  const addTransaction = async transaction => {
    try {
      const res = await instance.post("api/v1/transactions", transaction);

      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        transactions: state.transactions,
        getTransactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
