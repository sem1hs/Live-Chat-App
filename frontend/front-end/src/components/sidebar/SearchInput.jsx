import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found");
  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      ></input>
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none"></IoSearchSharp>
      </button>
    </form>
  );
}

export default SearchInput;
