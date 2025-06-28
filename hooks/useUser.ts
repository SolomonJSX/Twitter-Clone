import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { User } from "@/app/generated/prisma";

type ExtendedUser = User & {
    followersCount: number
}

const useUser = (userId: number) => {
    const {data, error, isLoading, mutate} = useSWR<ExtendedUser>(`/api/users/${userId}`, fetcher, {
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

export default useUser;