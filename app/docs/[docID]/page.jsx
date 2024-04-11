"use client";
import React, { useEffect, useState } from "react";
import { RoomProvider } from "@/liveblocks.config";
import CollaborativeEditor from "@/components/CollaborativeEditor";
import { ClientSideSuspense } from "@liveblocks/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatars } from "@/components/Avatars";

function page({ params }) {
  const [docData, setDocData] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const fetchDocumentData = async (docID) => {
    try {
      const response = await fetch("/api/docs/getOne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docID,
        }),
      });
      const data = await response.json();
      setDocData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("/api/users/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          docID: params.docID,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast("success", data.message);
        setEmail("");
      } else {
        showToast("error", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (type, message) => {
    switch (type) {
      case "success": {
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      }
      case "error": {
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      }
      default:
        break;
    }
  };

  const fetchMe = async () => {
    try {
      const response = await fetch("/api/users/me");
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocumentData(params.docID);
    fetchMe();
  }, []);

  return (
    docData && user && (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RoomProvider id={params.docID} initialPresence={{}}>
          <ClientSideSuspense fallback="Loading…">
            {() => (
              <div>
                <div className="px-5 pt-5 flex justify-between bg-slate-100 border-b-4 border-b-slate-300">
                  <div>
                    <h1 className="font-inter font-bold text-3xl">
                      {docData.doc.title}
                    </h1>
                    <h1 className="font-inter font-light text-md text-gray-500">
                      created on{" "}
                      {new Date(docData.doc.createdOn)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                      /
                      {(new Date(docData.doc.createdOn).getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}
                      /
                      {new Date(docData.doc.createdOn)
                        .getFullYear()
                        .toString()
                        .slice(-2)}
                    </h1>
                  </div>
                  <div className="flex">
                    <Avatars />
                    {user._id === docData.doc.owner && <div>
                      <button
                        className="outline_btn"
                        onClick={() =>
                          setOpenDropdown(() => setOpenDropdown(true))
                        }
                      >
                        Add Users
                      </button>
                      {openDropdown && (
                        <div className="absolute top-16 right-5 w-60 bg-slate-200 py-5 px-2 rounded-xl shadow-2xl flex flex-col gap-4 z-50 border border-black">
                          <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="search_input"
                          />
                          <div className="w-full flex justify-evenly">
                            <button
                              className="black_btn"
                              type="button"
                              onClick={() => handleAddUser()}
                            >
                              ADD
                            </button>
                            <button
                              className="outline_btn"
                              onClick={(prev) => setOpenDropdown(!prev)}
                            >
                              CANCEL
                            </button>
                          </div>
                        </div>
                      )}
                    </div>}
                  </div>
                </div>
                <CollaborativeEditor />
              </div>
            )}
          </ClientSideSuspense>
        </RoomProvider>
      </>
    )
  );
}

export default page;
