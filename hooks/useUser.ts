import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId: number) => {
    const {data, error, isLoading, mutate} = useSWR(`/api/users/${userId}`, fetcher, {
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