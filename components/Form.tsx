"use client"

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import usePosts from '@/hooks/usePosts'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface IFormProps {
  placeholder: string
  isComment?: boolean
  postId?: number
}

const Form = ({placeholder, isComment, postId}: IFormProps) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatePosts } = usePosts()

  const [body, setBody] = useState("second")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      await axios.post("/api/posts", { body })

      toast.success("Tweet Created")

      setBody("")

      await mutatePosts()
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">

    </div>
  )
}

export default Form