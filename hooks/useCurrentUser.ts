import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import {Follow, User} from "@/app/generated/prisma";

type CurrentUserType = User & {
    followers: Follow[]
    followings: Follow[]
}

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR<CurrentUserType>("/api/current", fetcher, {
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

export default useCurrentUser;