/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, CREATE, UPDATE, DELETE, AGGREGATE, CREATEFLASHCARD } from '../constants/actionTypes';

// const currentState = [
//       'subject1',
//       'subject2',
//       'subject3',
//       {
//             abc123
//       }
// ]

// const currentState = {
//       subjects: [
//             'subject1',
//             'subject2',
//       ],
//       cards: [
//             {
// "_id": "6080284710e5c0063c0cdbc4",
//       "name": "Matthew Heering",
//             "cardUserId": "607e34b9d5a70e7f985b977c",
//                   "topic": "Biology",
//                         "term": "Tree",
//                               "definition": "A tree",
//                                     "selectedFile": "",
//                                           "__v": 0
//     },
// {
//       "_id": "6080307cc9865606e57794d2",
//             "name": "jeb bush",
//                   "cardUserId": "607deccad5a70e7f985b977b",
//                         "topic": "Biology",
//                               "term": "Ecology",
//                                     "definition": "Study of interactions ",
//                                           "selectedFile": "",
//                                                 "__v": 0
// }
// ]
// }
export default (currentState = { cards: [], subjects: [] }, action) => {
      switch (action.type) {
            case FETCH_ALL:
                  return { ...currentState, cards: action.payload };
            case AGGREGATE:
                  return { ...currentState, subjects: action.payload };
            case CREATE:
                  return { ...currentState, subjects: [...currentState.subjects, action.payload.topic], cards: [...currentState.cards, action.payload] }
            // case CREATEFLASHCARD:
            //       return { ...currentState, cards: currentState.cards.map((card) => card._id === action.payload.id) }
            case DELETE:
                  // return {what you want the new state to be, exactly how you want it to look}
                  return { ...currentState, cards: currentState.cards.filter((card) => card._id !== action.payload.id) }
            case UPDATE:
                  return { ...currentState, cards: currentState.cards.map((card) => card._id === action.payload.id ? action.payload : card) };
            default:
                  return currentState;
      }
}