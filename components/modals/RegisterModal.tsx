"use client"

import React, {useCallback} from 'react';
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from 'axios';
import toast from "react-hot-toast"
import { signIn } from 'next-auth/react';

function RegisterModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) return;

        registerModal.onClose()
        loginModal.onOpen()
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post("/api/register", {
                email,
                name,
                username,
                password
            })

            await signIn("credentials", {
                email,
                password
            })

            toast.success("Successfully registered.")

            registerModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false);
        }
    }, [email, name, password, registerModal, username]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                disabled={isLoading}
            />
            <Input
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                value={name}
                disabled={isLoading}
            />
            <Input
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                value={username}
                disabled={isLoading}
            />
            <Input
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                value={password}
                />
        </div>
    )

    const footerContent = (
        <div className={"text-neutral-400 text-center mt-4"}>
            <p>Already have an account?</p>
            <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
                Sign in
            </span>
        </div>
    )

    return (
        <Modal body={bodyContent} disabled={isLoading} isOpen={registerModal.isOpen} onClose={registerModal.onClose} title={"Create an account"} onSubmit={onSubmit} actionLabel={"Register"} footer={footerContent} />
    );
}

export default RegisterModal;