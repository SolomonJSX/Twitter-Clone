import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import {useMemo} from "react";

const useFollow = (userId: number) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const isFollowing = useMemo(() => {

    }, [])
}