import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { User } from "@/app/generated/prisma";

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR<User>("/api/current", fetcher, {
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