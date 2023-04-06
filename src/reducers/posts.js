/* eslint-disable */
import { FETCH_ALL, CREATE, START_LOADING, END_LOADING, UPDATE, DELETE, LOCATION_CHANGE, RESET } from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { ...state, posts: [...state.posts, ...action.payload.data], lastPage: action.payload.lastPage }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload]}
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
        case LOCATION_CHANGE: 
            return state
        case RESET: 
            return { posts: [] }    
        default:
            return state
    }
}
/* eslint-enable */