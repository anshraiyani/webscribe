import React from "react";
import Image from "next/image";

function UserDocumentList({ docList }) {
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

const DocCard = ({ title, createdOn, handleDocClick, id }) => {
  return (
    <div
      className="flex flex-col bg-gray-200 shadow-xl rounded-lg mt-5 flex-wrap max-w-36 hover:bg-slate-300 cursor-pointer"
      onClick={() => handleDocClick(id)}
    >
      <div className="p-2">
        <Image src="/doc.png" width={100} height={100} alt="doc-image" />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <h1 className="text-gray-800 text-lg font-inter px-2 overflow-ellipsis overflow-hidden">
          {title}
        </h1>
        <h1 className="bg-gray-300 dropdown_link p-1">
          {createdOn.getDate().toString().padStart(2, "0")}/
          {(createdOn.getMonth() + 1).toString().padStart(2, "0")}/
          {createdOn.getFullYear().toString().slice(-2)}
        </h1>
      </div>
    </div>
  );
};
