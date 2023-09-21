"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/Button";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col border border-zinc-500 rounded-lg px-6 py-4">
        <h1 className="text-lg mb-1 text-center">Login</h1>

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
        <Button props={{ type: "submit", disabled: loading ? true : false }}>
          Login
        </Button>
        <Link href="/signup" className="text-xs hover:underline m-auto w-fit">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default Login;
