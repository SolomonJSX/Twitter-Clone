import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import {useMemo} from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = (userId: number) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal()

    const isFollowing = useMemo(() => {
        return currentUser?.followings.some(f => f.followingId == userId)
    }, [currentUser, userId])

    const toggleFollow = async () => {
        if (!currentUser) {
            loginModal.onOpen()
        }
        
        let request;

        try {
            if (isFollowing) {
                request = () => axios.delete("/api/follow", {
                    data: {
                        userId
                    }
                })
            } else {
                request = () => axios.post("/api/follow", {
                    userId
                })
            }

            await request()

            mutateCurrentUser()
            mutateFetchedUser()

            toast.success("Successfully created!")
        } catch (e) {
            toast.error(e)
        }
    }

    return {
        toggleFollow,
        isFollowing
    }
}

export default useFollow;