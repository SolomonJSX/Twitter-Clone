import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { User } from "@/app/generated/prisma";

type ExistingUserType = ({
    followings: {
        id: number;
        followerId: number;
        followingId: number;
    }[];
    followers: {
        id: number;
        followerId: number;
        followingId: number;
    }[];
} & {
    id: number;
    username: string | null;
    email: string | null;
    name: string | null;
    bio: string | null;
    emailVerified: Date | null;
    image: string | null;
    coverImage: string | null;
    profileImage: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    hasNotification: boolean | null;
}) | null

const useUser = (userId: number) => {
    const {data, error, isLoading, mutate} = useSWR<ExistingUserType>(`/api/users/${userId}`, fetcher, {
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