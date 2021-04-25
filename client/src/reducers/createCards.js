/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, CREATE, UPDATE, DELETE, AGGREGATE } from '../constants/actionTypes';

export default (currentState = { cards: [], subjects: [] }, action) => {
      switch (action.type) {
            case FETCH_ALL:
                  return { ...currentState, cards: action.payload };
            case AGGREGATE:
                  return { ...currentState, subjects: action.payload };
            case CREATE:
                  return { ...currentState, /*subjects: [...currentState.subjects, action.payload.topic],*/ cards: [...currentState.cards, action.payload] }
            case DELETE:
                  // return {what you want the new state to be, exactly how you want it to look}
                  return { ...currentState, cards: currentState.cards.filter((card) => card._id !== action.payload.id) }
            case UPDATE:
                  return { ...currentState, cards: currentState.cards.map((card) => card._id === action.payload.id ? action.payload : card), subjects: [...currentState.subjects, action.payload.topic] };
            default:
                  return currentState;
      }
}