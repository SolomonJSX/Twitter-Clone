import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "./Avatar";

interface UserHeroProps {
    userId: number;
}

const UserHero = ({ userId }: UserHeroProps) => {
    const { data: fetchedUser } = useUser(userId);

    return (
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {
                    fetchedUser?.coverImage && (
                        <Image
                            src={fetchedUser.coverImage}
                            fill
                            alt="Cover Image"
                            style={{objectFit: "cover"}}  
                        />  )
                }

                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    );
}

export default UserHero;