import React, { useState } from 'react'
import { ellipsis } from '../assets'
import moment from 'moment'
import { Avatar, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../actions/posts'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import { useNavigate } from 'react-router-dom'

const Card = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ toggle, setToggle ] = useState(false)

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length >= 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      }

    const editPost = () => {
      setCurrentId(post._id)
      navigate('/createPost')
    }
    
  return (
    
    <div className="flex flex-col border-[1px] p-2 mb-8 bg-secondary min-w-[750px]">
        <div className="flex flex-row items-start justify-between p-2">
            <div className="flex flex-row justify-between" >
                 <div className="flex mt-1">
                    <Avatar alt={post.name} src={post.profilePic} className="rounded-full w-[32px] h-[32px]">{post.name.charAt(0)}</Avatar>
                </div> 
                <div className="flex flex-col ml-4">
                    <h4 className="font-poppins text-[24px] text-white">{post.email}</h4>
                    <h4 className="font-poppins text-[24px] text-white">{post.name}</h4>
                    <h4 className="font-poppins text-[16px] text-dimWhite">{moment(post.createdAt).fromNow()}</h4>
                </div>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <div className="flex flex-col min-w-[80px] items-end">
                <button className="p-1 hover:bg-tertiary rounded-md" onClick={() => setToggle((prev) => !prev)}>
                  <img src={ellipsis} className="h-[24px] w-[24px] object-contain" alt="edit" />
                </button>
              <div className={`${toggle ? 'flex' : 'hidden'} flex-col bg-tertiary rounded-xl p-4 mt-7 absolute shadow-md`}>
                <button className="mt-1 font-poppins text-[16px] text-white" onClick={editPost}>Edit</button>
                <div className="border-t-[1px] border-grayBorder m-2"></div>
                <button className="mt-1 font-poppins text-[16px] text-white" onClick={() => dispatch(deletePost(post._id))}>Delete</button>
              </div>
            </div>
            )}
        </div>
        <div className="p-2 text-dimWhite font-normal">
            <h4>{post.message}</h4>
        </div>
       {post.image && 
        <>
          <div className="p-2 justify-center">
            <img src={post.image} alt="post" className="h-[400px] w-full" />
          </div>
        </>}
       <div className="m-4">
            <Button size="medium" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                <Likes />
            </Button>
       </div>
    </div>

  )
}

export default Card