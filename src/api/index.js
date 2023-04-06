import axios from 'axios'

const API = axios.create({ baseURL: 'https://image-sharing-api.onrender.com' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const signIn = (formData) => API.post(`/user/signin`, formData) 

export const signUp = (formData) => API.post(`/user/signup`, formData)

export const signUpGoogle = (accessToken) => API.post(`/user/signup`, { googleAccessToken: accessToken })

export const createPost = (newPost) => API.post(`/posts`, newPost)

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)