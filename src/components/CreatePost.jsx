import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../actions/posts'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const CreatePost = ({currentId, setCurrentId}) => {
    const [ postData, setPostData ] = useState({ name: '', message: '', image: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const handleSubmit = (e) => {
        e.preventDefault()
         if(currentId === 0){
             dispatch(createPost({ ...postData, name: user?.result?.name, profilePic: user?.result?.picture }, navigate))
             setLoading(true)
             setDisabled(true)
         } else {
            dispatch(updatePost( currentId, { ...postData, name: user?.result?.name }, navigate))
            setLoading(true)
            setDisabled(true)
         }
    }
    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

  return (
    <section className="flex items-center justify-center">
        <div className="bg-secondary flex flex-col mx-4 my-12 p-10 items-center rounded-md">
            <h2 className="text-white text-[24px] font-poppins">Post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-[500px]">
                <textarea type="text" className="rounded-md p-2 mt-6" rows={5} required placeholder="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} disabled={disabled} />
                <div className="mt-4">
                    <Button disabled={disabled} sx={{ color: 'white' }}>
                    <FileBase 
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, image: base64})}
                    />
                    </Button>
                </div>
                <button type="submit" disabled={disabled} className="flex items-center font-poppins rounded-md bg-tertiary px-4 mt-4 py-2 text-white justify-center">
                    {loading ? <><svg className="h-5 w-5 mr-3  text-white animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" ></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-poppins "> Loading... </span></> 
                        : 
                        (currentId === 0 ? 'Create' : 'Update')}   
                </button>
            </form>
        </div>
    </section>
  )
}

export default CreatePost