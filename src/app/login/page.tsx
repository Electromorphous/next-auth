"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/Button";
import Input from "@/components/Input";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/api/users/login", user)
      .then((res) => {
        console.log("Success", res.data);
        router.push("/profile");
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
        <h1 className="text-lg mb-1 text-center">Login</h1>

        <label htmlFor="Email" className="text-zinc-300 text-sm">
          Email
        </label>
        <Input
          props={{
            autoFocus: true,
            required: true,
            type: "email",
            id: "email",
            name: "email",
            value: user.email,
            onChange: (e: any) =>
              setUser((prev) => ({ ...prev, email: e.target.value })),
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

        <Button props={{ type: "submit", disabled: loading }}>
          {loading ? "Loading..." : "Login"}
        </Button>
        <Link href="/signup" className="text-xs hover:underline m-auto w-fit">
          Create account
        </Link>
      </form>
    </div>
  );
}

export default Login;
