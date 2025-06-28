import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { User } from "@/app/generated/prisma";

const useUsers = () => {
    const {data, error, isLoading, mutate} = useSWR<User[]>("/api/users", fetcher, {
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

export default useUsers;