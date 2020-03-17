import {
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  TRANSACTION_ERROR
} from "./ActionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(el => el._id !== action.payload)
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
