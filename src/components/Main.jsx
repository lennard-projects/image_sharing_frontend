import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../actions/posts'
import { Card } from '../components'
import { CircularProgress } from '@mui/material'

const Main = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  const { posts, isLoading, lastPage } = useSelector((state) => state.posts)
  const [ pages, setPages ] = useState(1)
  const loadmore= () => {
    setPages(pages + 1)
  }

   useEffect(() => {
     dispatch(getPosts(pages))
   },[dispatch, pages, currentId])

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <section className="flex flex-col justify-center items-center border-x-[1px] border-x-grayBorder md:mx-[240px] md:p-10 mx-4 py-5">
        <div>
            {posts?.map((post) => 
                <div key={post._id} >
                    <Card post={post} setCurrentId={setCurrentId}/>
                </div>
            )}
            {isLoading ? <CircularProgress /> : (
                posts.length >= lastPage ? <h2 className="text-white w-full text-center">No more posts.</h2> : (
                    <button onClick={loadmore} className="text-white font-poppins text-[16px] w-full">Load More</button>
                )
            )
            }
        </div>
    </section>
      )
}

export default Main