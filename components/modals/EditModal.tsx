"use client"

import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../Input'
import ImageUpload from "@/components/ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id as number)
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = React.useState<string | null>(null)
  const [coverImage, setCoverImage] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string | null>(null)
  const [bio, setBio] = React.useState<string | null>(null)
  const [username, setUsername] = React.useState<string | null>(null)

  useEffect(() => {
    setProfileImage(currentUser?.profileImage as string)
    setCoverImage(currentUser?.coverImage as string)
    setName(currentUser?.name as string)
    setBio(currentUser?.bio as string)
    setUsername(currentUser?.username as string)
  }, [currentUser])

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      await axios.patch("/api/edit", {
        profileImage,
        coverImage,
        name,
        bio,
        username
    })

    await mutateFetchedUser()
    toast.success("Profile updated successfully")

    editModal.onClose()

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while updating your profile")
    } finally {
      setIsLoading(false)
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
          onChange={(image) => setProfileImage(image)}
          label={"Upload profile image"}
          disabled={isLoading}
          value={profileImage as string}
          />
      <ImageUpload
          onChange={(image) => setCoverImage(image)}
          label={"Upload cover image"}
          disabled={isLoading}
          value={coverImage as string}
      />
      <Input
        type="text"
        placeholder="Name"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        type="text"
        placeholder="Username"
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        value={bio || ''}
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit your profile" actionLabel="Save" onClose={editModal.onClose} onSubmit={onSubmit} body={bodyContent} />
  )
}

export default EditModal