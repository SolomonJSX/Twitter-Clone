"use client"

import React, {FC, useCallback} from 'react';
import {useRouter} from "next/navigation";
import {BiArrowBack} from "react-icons/bi";

interface IHeaderProps {
    label: string;
    showBackArrow?: boolean;
}

const Header: FC<IHeaderProps> = ({
    label,
    showBackArrow}) => {
    const router = useRouter()

    const handleBack = useCallback(() => {
        router.back()
    }, [router])

    return (
        <div className="border-b-[1px] border-neutral-800 p-5">
            <div className="flex flex-row items-center gap-2">
                {
                    showBackArrow && (
                        <BiArrowBack
                            onClick={handleBack}
                            color="white"
                            size={20}
                            className="
                            cursor-pointer
                            hover:opacity-75
                            transition" />
                    )
                }

                <h1 className="text-white text-xl font-semibold">{label}</h1>
            </div>
        </div>
    );
};

export default Header;