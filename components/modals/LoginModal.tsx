"use client"

import React, {useCallback} from 'react';
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            await signIn("credentials", {
                email,
                password
            })

            toast.success("Successfully sign in!")

            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const onToggle = () => {
        if (isLoading) return;

        loginModal.onClose()
        registerModal.onOpen()
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
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
            <p>First time using Twitter?</p>
            <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
                Create an account
            </span>
        </div>
    )

    return (
        <Modal disabled={isLoading} body={bodyContent} isOpen={loginModal.isOpen} onClose={loginModal.onClose} title={"Log In"} onSubmit={onSubmit} actionLabel={"Login"} footer={footerContent} />
    );
}

export default LoginModal;