import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import {
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  TRANSACTION_ERROR,
} from './ActionTypes';

//Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

const backendUrl = process.env.REACT_APP_BACKEND_URL;

//Create context
export const GlobalContext = createContext(initialState);

//Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getTransactions() {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/transactions`);

      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error,
      });
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/v1/transactions/${id}`);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/transactions`,
        transaction,
        config
      );

      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: error.response.data.error,
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
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
