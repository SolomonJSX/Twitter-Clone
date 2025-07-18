"use client"

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import {useRouter} from 'next/navigation'
import React, {useMemo} from 'react'
import {formatDistanceToNowStrict} from "date-fns";
import Avatar from "@/components/Avatar";
import {AiOutlineHeart, AiOutlineMessage} from "react-icons/ai";
import {PostWithRelations} from "@/hooks/usePosts";

interface IPostItemProps {
    data: PostWithRelations
    userId?: number
}

const PostsItem = ({data, userId}: IPostItemProps) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const {data: currentUser} = useCurrentUser()

    const goToUser = (even: React.MouseEvent<HTMLDivElement>) => {
        even.stopPropagation()
        router.push(`/users/${data.user.id}`)
    }

    const goToPost = () => {
        router.push(`/posts/${data.id}`)
    }

    const onLike = (even: React.MouseEvent<HTMLDivElement>) => {
        even.stopPropagation()
        loginModal.onOpen()
    }

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }

        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])

    return (
        <div
            onClick={goToPost}
            className={"border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"}
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id}/>
                <div>
                    <div className="flex flex-row items-center gap-2">

                        <p onClick={goToUser}
                           className={"text-white font-semibold cursor-pointer hover:underline"}>{data.user.name}</p>

                        <span onClick={goToUser}
                              className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                    @{data.user.username}
                </span>
                        <span className="text-neutral-500 text-sm">
                    {createdAt}
                </span>
                    </div>
                    <div className="text-white mt-1">{data.body}</div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                            <AiOutlineMessage size={20}/>
                            <p>
                                {data.comments?.length || 0}
                            </p>
                        </div>
                        <div
                            onClick={onLike}
                            className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                            <AiOutlineHeart size={20}/>
                            <p>
                                {data.comments?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsItem