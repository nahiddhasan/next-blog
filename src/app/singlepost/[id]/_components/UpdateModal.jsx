import useOutsideClick from "@/hooks/outsideClick";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const UpdateModal = ({ setUpdateModal, comment, mutate }) => {
  const [body, setBody] = useState(comment.body);
  const updateRef = useOutsideClick(() => setUpdateModal(false));

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!body) {
      return;
    }
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${comment.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ body }),
      }
    );
    mutate();
    setUpdateModal(false);
  };
  return (
    <form
      ref={updateRef}
      onSubmit={handleUpdate}
      className="p-2 bg-zinc-700 rounded-md"
    >
      <ReactTextareaAutosize
        className="w-full bg-transparent text-sm outline-none resize-none p-2 "
        placeholder="Update Your Thoughts?"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <div className="flex items-center gap-2">
        <button
          disabled={!body}
          type="submit"
          on
          className="disabled:cursor-not-allowed disabled:bg-zinc-800 rounded-full px-3 p-1 bg-zinc-900 hover:bg-zinc-800 text-sm text-white"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setUpdateModal(false)}
          className="rounded-full px-3 p-1 bg-zinc-600 hover:bg-zinc-800 text-sm text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateModal;
