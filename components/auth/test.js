import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* CONTENT WRAPPER */}
      <div className="flex flex-col md:flex-row max-w-6xl w-full px-6 md:px-10">

        {/* ---------- LEFT LOGO ---------- */}
        <div className="flex-1 flex items-center justify-center mb-10 md:mb-0">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-40 h-40 md:w-[400px] md:h-[400px] text-black"
            fill="currentColor"
          >
            <path d="M22.25 0L14.5 0 7.75 8.5 1 0H-6.75L6.75 16.5 0 24h7.75l6.75-8.5L21.25 24H29L15.5 7.5 22.25 0z" />
          </svg>
        </div>

        {/* ---------- RIGHT CONTENT ---------- */}
        <div className="flex-1 flex flex-col items-start justify-center">

          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Happening now
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Join today.
          </h2>

          {/* SIGN UP BUTTONS */}
          <button className="w-full md:w-96 py-3 bg-white border rounded-full shadow flex items-center justify-center gap-2 mb-3 hover:bg-gray-100">
            <img src="/google-logo.png" className="w-5" />
            <span className="font-semibold">Sign up with Google</span>
          </button>

          <button className="w-full md:w-96 py-3 bg-white border rounded-full shadow flex items-center justify-center gap-2 mb-3 hover:bg-gray-100">
            <img src="/apple-logo.png" className="w-5" />
            <span className="font-semibold">Sign up with Apple</span>
          </button>

          <div className="my-4 w-full md:w-96 text-center text-gray-500">OR</div>

          <button
            onClick={() => setOpen(true)}
            className="w-full md:w-96 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800"
          >
            Create account
          </button>

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
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
          ">

            {/* CLOSE BUTTON */}
            <button
              className="absolute left-6 top-6 text-2xl font-light md:left-8 md:top-8"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            {/* X LOGO */}
            <div className="flex justify-center mb-4 mt-2">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                fill="currentColor"
              >
                <path d="M22.25 0L14.5 0 7.75 8.5 1 0H-6.75L6.75 16.5 0 24h7.75l6.75-8.5L21.25 24H29L15.5 7.5 22.25 0z" />
              </svg>
            </div>

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Create your account
            </h1>

            {/* NAME FIELD */}
            <div className="mb-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                placeholder="Name"
                className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {name.length} / 50
              </div>
            </div>

            {/* PHONE FIELD */}
            <div className="mb-5">
              <input
                placeholder="Phone"
                className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-blue-600 text-sm mt-2 cursor-pointer">
                Use email instead
              </p>
            </div>

            {/* DOB */}
            <div>
              <h2 className="font-bold">Date of birth</h2>
              <p className="text-sm text-gray-500 mb-3">
                This will not be shown publicly...
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select className="border rounded-xl p-3">
                  <option>Month</option>
                </select>

                <select className="border rounded-xl p-3">
                  <option>Day</option>
                </select>

                <select className="border rounded-xl p-3">
                  <option>Year</option>
                </select>
              </div>
            </div>

            {/* NEXT BUTTON */}
            <button className="w-full mt-8 py-3 rounded-full bg-gray-300 text-gray-700 font-semibold">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
