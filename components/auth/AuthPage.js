'use client'

import Register from "./Register";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Login from "./Login";

export default function AuthPage() {
    const [open, setOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center p-8">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 1200 1227"
                    className="w-40 h-40 md:w-[400px] md:h-[400px] text-black"
                    fill="currentColor"
                >
                    <path d="M714.163 519.284L1160.89 0H1052.63L668.299 450.378L356.043 0H0L468.396 681.699L0 1226.37H108.779L512.021 744.367L843.957 1226.37H1200L714.137 519.284H714.163ZM563.189 676.297L517.005 608.761L148.255 79.6941H301.828L597.214 505.062L643.397 572.599L1020.02 1150.64H866.447L563.189 676.297Z" />
                </svg>
            </div>

            <div className="flex flex-col justify-center px-10 md:px-16 space-y-8">

                <h1 className="text-5xl font-extrabold">Happening now</h1>
                <h2 className="text-3xl font-extrabold">Join today.</h2>

                <div className="flex flex-col space-y-3 w-full max-w-sm">

                    <button onClick={() => setOpenLogin(true)} className="border border-gray-300 rounded-full py-2 font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                        <span>Login</span>
                    </button>

                    {openLogin && (<Login onClose={() => setOpenLogin(false)} />)}
                    <div className="flex items-center space-x-2 my-2">
                        <div className="grow h-px bg-gray-200"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="grow h-px bg-gray-200"></div>
                    </div>

                    <button onClick={() => setOpen(true)} className="bg-black text-white rounded-full py-2 font-bold hover:bg-neutral-900 transition w-full">
                        Create account
                    </button>

                    {open && (<Register onClose={() => setOpen(false)} />)}

                    <p className="text-xs text-gray-500 leading-4">
                        By signing up, you agree to the{" "}
                        <a className="text-blue-500" href="#">Terms of Service</a> and{" "}
                        <a className="text-blue-500" href="#">Privacy Policy</a>, including{" "}
                        <a className="text-blue-500" href="#">Cookie Use</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}