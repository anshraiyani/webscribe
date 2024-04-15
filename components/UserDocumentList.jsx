import React, { useState } from "react";
import Image from "next/image";

function UserDocumentList({ docList, deleteDoc, updateDoc }) {
  const handleDocClick = (id) => {
    window.open(`/docs/${encodeURIComponent(id)}`, "_blank");
  };

  return (
    <div className="px-8">
      <h1 className="text-2xl font-satoshi text-gray-600 font-extrabold">
        Your Documents
      </h1>
      {docList.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {docList.map((el) => (
            <DocCard
              key={el._id}
              id={el._id}
              title={el.title}
              createdOn={new Date(el.createdOn)}
              handleDocClick={handleDocClick}
              deleteDoc={deleteDoc}
              updateDoc={updateDoc}
            />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-xl text-slate-400 font-semibold ">
            No Documents
          </h1>
          <h1 className="text-lg text-slate-400">create a document!</h1>
        </div>
      )}
    </div>
  );
}

export default UserDocumentList;

const DocCard = ({
  title,
  createdOn,
  handleDocClick,
  id,
  deleteDoc,
  updateDoc,
}) => {
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newtitle, setTitle] = useState("");

  const handleCancel = () => {
    setToggle(false);
    setUpdate(false);
  };

  const handleUpdate = () => {
    updateDoc(id, newtitle);
    handleCancel();
    setTitle("")
  };

  return (
    <>
      <div className="mt-5 max-w-36 flex flex-col gap-1 relative">
        <div
          className="cursor-pointer flex px-1 justify-end"
          onClick={() => setToggle(!toggle)}
        >
          <h1 className="font-bold font-sans text-xl hover:text-red-700 hover:text-2xl">. . .</h1>
          {toggle ? (
            <div className="absolute mt-8 bg-blue-200 border-black border rounded-md shadow-xl">
              <h1
                className="font-sans text-lg py-2 px-5 hover:bg-blue-300"
                onClick={() => setUpdate(true)}
              >
                Edit
              </h1>
              <h1
                className="font-sans text-lg py-2 px-5 hover:bg-blue-300"
                onClick={() => deleteDoc(id)}
              >
                Delete
              </h1>
              <h1
                className="font-sans text-lg py-2 px-5 hover:bg-blue-300"
                onClick={handleCancel}
              >
                Cancel
              </h1>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="bg-gray-200 shadow-xl rounded-lg hover:bg-slate-300 cursor-pointer flex-1 flex flex-col justify-between"
          onClick={() => handleDocClick(id)}
        >
          <div className="p-2">
            <Image src="/doc.png" width={100} height={100} alt="doc-image" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-800 text-lg font-inter px-2 overflow-ellipsis overflow-hidden mt-auto">
              {title}
            </h1>
            <h1 className="bg-gray-300 dropdown_link p-1">
              {createdOn.getDate().toString().padStart(2, "0")}/
              {(createdOn.getMonth() + 1).toString().padStart(2, "0")}/
              {createdOn.getFullYear().toString().slice(-2)}
            </h1>
          </div>
        </div>
        {update && (
          <div className="bg-slate-300 p-2 absolute top-full mt-2">
            <input
              className="w-full px-1 font-sans text-lg"
              value={newtitle}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex justify-between mt-2">
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white text-sm py-2 px-2 rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
