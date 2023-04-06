import { AUTH, RESET } from '../constants/actionTypes'
import * as api from '../api/index'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        navigate('/')
        dispatch({ type: RESET })
        window.location.reload(false)
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data })
        navigate('/')
        dispatch({ type: RESET })
        window.location.reload(false)
    } catch (error) {
        console.log(error);
    }
}

export const signUpGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUpGoogle(accessToken)
        dispatch({ type: AUTH, data })
        navigate('/')
        dispatch({ type: RESET })
        window.location.reload(false)
    } catch (error) {
        console.log(error);
    }
}
