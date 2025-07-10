"use client"

import usePosts from '@/hooks/usePosts';
import React from 'react'
import PostsItem from "@/components/posts/PostsItem";

interface IPostsFeedProps {
  userId?: number;
}

const PostsFeed = ({ userId }: IPostsFeedProps) => {
  const { data: posts } = usePosts(userId)

  return (
    <>
      {posts?.map(post => (
        <PostsItem data={post} userId={userId} key={post.id} />
      ))}
    </>
  )
}

export default PostsFeed;