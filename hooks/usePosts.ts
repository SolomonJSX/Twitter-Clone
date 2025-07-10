import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import {Comment, Post, User} from "@/app/generated/prisma";

export type PostWithRelations = Post & {
    user: User;
    comments: Comment[]
}

const usePosts = (userId?: number) => {
    const url = userId ? `/api/posts?userId=${userId}` : "/api/posts"

    const {data, error, isLoading, mutate} = useSWR<PostWithRelations[]>(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default usePosts;