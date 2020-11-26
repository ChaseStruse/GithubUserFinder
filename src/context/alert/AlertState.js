import React, {useReducer} from "react";
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {SET_ALERT, REMOVE_ALERT, SET_LOADING} from '../types';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setLoading = () => dispatch({type: SET_LOADING});

    const setAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {message, type}
        })
        setTimeout(() => dispatch({type: REMOVE_ALERT}), 3000);
    };

    return <AlertContext.Provider value={{ alert: state, setAlert}}>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState