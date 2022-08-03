import axios from 'axios';

const RECEIVE_DATA = 'RECEIVE_DATA';

const defaultState = 0;

const receiveData = data => ({ type: RECEIVE_DATA, data });

export const attemptReceiveData = data => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/data', data);
            dispatch(receiveData(res.data));
        } catch (error) {
            console.error(error);
        }
    };
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case RECEIVE_DATA:
            return action.data;
        default:
            return state;
    }
}