"use client";

import NavBar from "@/components/NavBar";
import UserDocumentList from "@/components/UserDocumentList";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [docList, setDocList] = useState(null);

  const fetchMe = async () => {
    try {
      const response = await fetch("/api/users/me");
      const data = await response.json();
      setUser(data.data);
      if (data.data && data.data._id) {
        fetchDocs(data.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createDoc = async () => {
    if (title.length === 0) {
      return toast.error("Title cannot be empty", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    try {
      const response = await fetch("/api/docs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          ownerID: user?._id,
        }),
      });
      console.log(response);
      setOpenForm(false);
      if (response.ok) {
        await fetchDocs(user?._id);
        toast.success("document created", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocs = async (ownerID) => {
    try {
      const response = await fetch("/api/docs/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerID,
        }),
      });
      const data = await response.json();
      console.log(data);
      setDocList(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoc = async (docID) => {
    try {
      const response = await fetch("/api/docs/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docID: docID,
        }),
      });

      if (response.ok) {
        toast.success("document deleted!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchDocs(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDoc = async (docID, newTitle) => {
    if (newTitle.length === 0) {
      return toast.error("title cannot be empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    try {
      const response = await fetch("/api/docs/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docID: docID,
          title: newTitle,
        }),
      });

      if (response.ok) {
        toast.success("document updated!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchDocs(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
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
      {openForm && (
        <div className="absolute bottom-1/4 left-0 w-full h-full flex justify-center items-center z-20">
          <form className="bg-gray-200 p-5 shadow-xl rounded-md">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2 font-satoshi"
              >
                Edit Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form_input"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={createDoc}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setOpenForm(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={`${openForm ? "blur-sm" : ""}`}>
        <NavBar setOpenForm={setOpenForm} />
        <hr className="h-0.5 mx-8 my-2 bg-gray-200 border-0 dark:bg-gray-400" />
      </div>
      <div className={`${openForm ? "blur-sm" : ""}`}>
        {docList && (
          <UserDocumentList
            docList={docList}
            deleteDoc={deleteDoc}
            updateDoc={updateDoc}
          />
        )}
      </div>
    </>
  );
};

export default page;
