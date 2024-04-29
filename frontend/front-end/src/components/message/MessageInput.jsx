import { BiSend } from "react-icons/bi";
import useSendMessages from "../../hooks/useSendMessage";
import { useState } from "react";
function MessageInput() {
  const [message, setMessage] = useState();
  const { sendMessage, loading } = useSendMessages();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
        placeholder="Send a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="absolute inset-y-0 end-0 flex items-center pr-6"
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <BiSend></BiSend>
        )}
      </button>
    </form>
  );
}
export default MessageInput;
