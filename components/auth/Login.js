
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function RegisterPage({ onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const loginData = {
                email,
                password
            };

            //console.log(registerData);

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (data.success) {
                //router.push("/main");
                router.push(`/main`);
            }
            else
                setError(data.message || "User can not be created");
        }
        catch (error) {
            setError("error fetching data: " + error.message);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="
    bg-white 
    rounded-2xl 
    shadow-xl 
    p-8 
    w-full 
    max-w-lg 
    max-h-[95vh]
    overflow-y-auto
    relative
">

                <button
                    className="absolute top-4 left-4 text-2xl font-light hover:bg-gray-200/60 rounded-full w-8 h-8 flex items-center justify-center transition"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex justify-center mb-4 mt-2">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 1200 1227"
                        className="w-8 h-8 text-black"
                        fill="currentColor"
                    >
                        <path d="M714.163 519.284L1160.89 0H1052.63L668.299 450.378L356.043 0H0L468.396 681.699L0 1226.37H108.779L512.021 744.367L843.957 1226.37H1200L714.137 519.284H714.163ZM563.189 676.297L517.005 608.761L148.255 79.6941H301.828L597.214 505.062L643.397 572.599L1020.02 1150.64H866.447L563.189 676.297Z" />
                    </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                    Sign in to X
                </h1>
                <div className="mb-5">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {error && (
                        <p className="text-red-500 mb-3">{error}</p>
                    )}
                </div>
                <div className="mb-5">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {error && (
                        <p className="text-red-500 mb-3">{error}</p>
                    )}
                </div>
                <button onClick={handleLogin} className="w-full mt-8 py-3 rounded-full bg-black text-white hover:bg-neutral-90 font-semibold">
                    Login
                </button>
            </div>
        </div>

    );
}