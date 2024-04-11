"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function NavBar({setOpenForm}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/auth/signout");
    } catch (error) {
      console.log(error.message);
    } finally {
      router.push("/signin");
    }
  };

  return (
    <div className="p-2 flex w-full align-middle justify-between px-10">
      <h1 className="nav_head_text blue_gradient text-left w-fit">WebScribe</h1>
      <div className="flex gap-5">
        <button className="black_btn" onClick={()=>setOpenForm(true)}>CREATE DOC</button>
        <button className="outline_btn" onClick={handleLogout}>
          SIGN OUT
        </button>
      </div>
    </div>
  );
}

export default NavBar;
