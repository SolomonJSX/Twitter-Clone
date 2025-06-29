"use client";

import Header from '@/components/Header'
import UserBio from '@/components/UserBio';
import UserHero from '@/components/UserHero';
import useUser from '@/hooks/useUser';
import { useParams } from 'next/navigation';
import React from 'react'
import { ClipLoader } from "react-spinners"

export default function Page() {
  const params = useParams(); // 👈 это работает только на клиенте
  const slug = params?.slug as string;
  const userId = parseInt(slug);

  const { data: fetchedUser, isLoading } = useUser(userId);

  console.log('fetchedUser', fetchedUser);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <>
        <Header label={fetchedUser.name!} showBackArrow />
        <UserHero userId={fetchedUser.id} />
        <UserBio userId={fetchedUser.id} />
    </>
  )
}