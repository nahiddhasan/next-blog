"use client";

import useOutsideClick from "@/hooks/outsideClick";

const DeleteModal = ({ setDeleteModal, comment, mutate }) => {
  const deleteRef = useOutsideClick(() => {
    setDeleteModal(false);
  });
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${comment.id}`,
      {
        method: "DELETE",
      }
    );
    mutate();
    setDeleteModal(false);
  };
  return (
    <div
      ref={deleteRef}
      className="flex flex-col items-center justify-center gap-2 bg-zinc-600 h-[80px] rounded-md"
    >
      <h1>Delete?</h1>
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="bg-green-500 hover:bg-green-400 px-2 rounded-md "
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setDeleteModal(false)}
          className="bg-zinc-700 hover:bg-zinc-400 px-2 rounded-md"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
