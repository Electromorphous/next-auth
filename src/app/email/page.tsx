"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Email() {
  const [token, setToken] = useState("");

  const verifyEmail = async () => {
    await axios
      .post("/api/users/verifyEmail", { token: token })
      .then((res) => console.log(res.data));
  };
  return <div>Email</div>;
}

export default Email;
