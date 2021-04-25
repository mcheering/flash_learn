import { FETCH_ALL, CREATE, UPDATE, DELETE, AGGREGATE } from '../constants/actionTypes';
import * as api from '../api/index';

export const getCards = () => async (dispatch) => {
      try {
            const { data } = await api.fetchCards()
            dispatch({ type: FETCH_ALL, payload: data });

      } catch (error) {
            console.log(error)
      }
}

export const aggregateSubjects = () => async (dispatch) => {
      try {
            const { data } = await api.aggregateSubjects()
            dispatch({ type: AGGREGATE, payload: data })
      } catch (error) {
            console.log(error)

      }
}

export const createCard = (card) => async (dispatch) => {
      try {
            const { data } = await api.createCard(card);
            dispatch({ type: CREATE, payload: data })
      } catch (error) {
            console.log(error)
      }
}

export const updateCard = (id, card) => async (dispatch) => {
      try {
            const { data } = await api.updateCard(id, card);
            dispatch({ type: UPDATE, payload: data })
      } catch (error) {
            console.log(error)
      }
}

export const deleteCard = (id) => async (dispatch) => {
      try {
            const { data } = await api.deleteCard(id)
            dispatch({ type: DELETE, payload: data })
      } catch (error) {
            console.log(error)
      }
}

export const getCardForTopic = (topic) => async (dispatch) => {
      try {
            const { data } = await api.getCardForTopic(topic)
            dispatch({ type: FETCH_ALL, payload: data })
      } catch (error) {
            console.log(error)
      }
}