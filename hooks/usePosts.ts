import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { User } from "@/app/generated/prisma";

const usePosts = (userId?: number) => {
    const url = userId ? `/api/posts?userId=${userId}` : "/api/posts"

    const {data, error, isLoading, mutate} = useSWR<User[]>("/api/posts", fetcher, {
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