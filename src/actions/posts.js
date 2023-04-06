import { CREATE, END_LOADING, START_LOADING, FETCH_ALL, UPDATE, DELETE, LOCATION_CHANGE, RESET } from "../constants/actionTypes";
import * as api from '../api'

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
        navigate('/posts')
        dispatch({ type: RESET })
        //window.location.reload(false)
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
        navigate('/posts')
        dispatch({ type: RESET })
        //window.location.reload(false)
    } catch (error) {
        console.log(error);
    }
}

export const locationChange = () => async (dispatch) => {
    try {
        dispatch({ type: LOCATION_CHANGE })
    } catch (error) {
        console.log(error);
    }
}