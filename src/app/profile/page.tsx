"use client";
import { useEffect, useState } from "react";
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
      .catch((err) => console.error(err.response.data.error))
      .finally(() => setLoading(false));
  };

  const getUserData = async () => {
    await axios
      .get("/api/users/profile")
      .then((res) => {
        console.log("Data received", res.data);
      })
      .catch((err) => console.error(err.response.data.error));
  };

  useEffect(() => {
    getUserData();
  }, []);

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
