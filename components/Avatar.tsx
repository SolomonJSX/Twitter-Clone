"use client"

import useUser from "@/hooks/useUser"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

interface IAvatarProps {
    userId: number
    isLarge?: boolean
    hasBorder?: boolean
}

const Avatar = ({
    userId,
    isLarge,
    hasBorder
}: IAvatarProps) => {

    const router = useRouter();

    const { data: extendedUser } = useUser(userId)

    const onClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    };

    return (
        <div className={`
                ${hasBorder ? "border-4 border-black" : ""}
                ${isLarge ? "h-32" : "h-12"}  
                ${isLarge ? "w-32" : "w-12"}
                rounded-full
                hover:opacity-90
                transition
                cursor-pointer
                relative
            `}>
            <Image 
                alt="Avatar" 
                fill style={{
                    objectFit: "cover",
                    borderRadius: "100%"
                }} 
                onClick={onClick} 
                src={extendedUser?.profileImage || "/images/placeholder.png"}    
            />
        </div>
    );
}

export default Avatar;