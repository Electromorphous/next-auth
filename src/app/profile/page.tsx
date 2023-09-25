"use client";
import { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

function Profile() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);

    await axios
      .get("/api/users/logout")
      .then((res) => {
        console.log("Logout successful");
        console.log(res.data);
        router.push("/login");
      })
      .catch((err) => console.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h1>Profile page</h1>
      <Button props={{ onClick: logout, disabled: loading }}>
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </>
  );
}

export default Profile;
