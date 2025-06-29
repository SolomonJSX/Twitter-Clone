"use client"

import {BsBellFill, BsHouseFill} from "react-icons/bs";
import {FaUser} from "react-icons/fa";
import SidebarLogo from "@/components/layout/SidebarLogo";
import SidebarItem from "@/components/layout/SidebarItem";
import {BiLogOut} from "react-icons/bi";
import SidebarTweetButton from "@/components/layout/SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import {signOut} from "next-auth/react";

export const Sidebar = () => {

    const { data: currentUser } = useCurrentUser()

    const items = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill,
            auth: true
        },
        {
            label: "Profile",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        }
    ]

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item, index) => (
                        <SidebarItem label={item.label} icon={item.icon} key={index} href={item.href} auth={item.auth} />
                    ))}
                    {currentUser && (
                        <SidebarItem onClick={() => signOut()} icon={BiLogOut} label={"Logout"} />
                    )}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    );
};