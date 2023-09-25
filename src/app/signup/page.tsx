"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/Button";
import Input from "@/components/Input";

function Signup() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/api/users/signup", user)
      .then((res) => {
        console.log("Success", res.data);
        router.push("/login");
      })
      .catch((err) => console.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-zinc-500 rounded-lg px-6 py-4"
      >
        <h1 className="text-lg mb-1 text-center">Signup</h1>

        <label htmlFor="Email" className="text-zinc-300 text-sm">
          Email
        </label>
        <Input
          props={{
            required: true,
            type: "email",
            id: "email",
            name: "email",
            value: user.email,
            onChange: (e: any) =>
              setUser((prev) => ({ ...prev, email: e.target.value })),
          }}
        />

        <label htmlFor="username" className="text-zinc-300 text-sm">
          Username
        </label>
        <Input
          props={{
            required: true,
            type: "text",
            id: "username",
            name: "username",
            value: user.username,
            onChange: (e: any) =>
              setUser((prev) => ({ ...prev, username: e.target.value })),
          }}
        />

        <label htmlFor="password" className="text-zinc-300 text-sm">
          Password
        </label>
        <Input
          props={{
            required: true,
            type: "password",
            id: "password",
            name: "password",
            value: user.password,
            onChange: (e: any) =>
              setUser((prev) => ({ ...prev, password: e.target.value })),
          }}
        />

        <Button props={{ type: "submit", disabled: loading ? true : false }}>
          {loading ? "Loading..." : "Signup"}
        </Button>
        <Link href="/login" className="text-xs hover:underline m-auto w-fit">
          Already have an account
        </Link>
      </form>
    </div>
  );
}

export default Signup;
