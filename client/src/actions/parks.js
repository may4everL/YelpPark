import * as api from '../api';


const getParks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchParks();
        dispatch({
            type: "FETCH_ALL",
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}