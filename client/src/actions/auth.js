import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index';

export const login = (formData, history) => async (dispatch) => {
      try {
            //login the user..
            const { data } = await api.login(formData);
            dispatch({ type: AUTH, data });

            history.push('/');
      } catch (error) {
            console.log(error);
      }
}

export const signup = (formData, history) => async (dispatch) => {
      try {
            //signup the user..

            const { data } = await api.signup(formData);
            dispatch({ type: AUTH, data });

            history.push('/')
      } catch (error) {
            console.log(error);
      }
}