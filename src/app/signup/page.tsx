"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col border border-zinc-500 rounded-lg shadow-md px-6 py-4">
        <h1 className="text-lg mb-1 text-center">Signup</h1>

        <label htmlFor="Email" className="text-zinc-300 text-sm">
          Email
        </label>
        <input
          className="px-4 py-2 bg-transparent border border-zinc-500 rounded-md mb-4 mt-1 outline-none focus:border-zinc-200"
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor="username" className="text-zinc-300 text-sm">
          Username
        </label>
        <input
          className="px-4 py-2 bg-transparent border border-zinc-500 rounded-md mb-4 mt-1 outline-none focus:border-zinc-200"
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
        />

        <label htmlFor="password" className="text-zinc-300 text-sm">
          Password
        </label>
        <input
          className="px-4 py-2 bg-transparent border border-zinc-500 rounded-md mb-4 mt-1 outline-none focus:border-zinc-200"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button className="px-2 py-1 border border-zinc-300 bg-transparent rounded-lg my-3 outline-none hover:bg-zinc-200 hover:text-black transition-all">
          <strong>Signup</strong>
        </button>
        <Link href="/login" className="text-xs hover:underline m-auto w-fit">
          Already have an account
        </Link>
      </div>
    </div>
  );
}

export default Signup;
