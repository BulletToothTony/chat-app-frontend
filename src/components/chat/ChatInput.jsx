import React, { useContext, useState } from "react";
import authContext from "../../context/auth-context";
import { IoSend } from "react-icons/io5";

function ChatInput(props) {
  const [textInput, setTextInput] = useState("");
  const auth = useContext(authContext)

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/chats/${props.chatId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        body: JSON.stringify({
          sendinguserId: auth.userId,
          text: textInput,
        }),
      }
    );

    setTextInput("");
    props.newMessageSentHandler(textInput)
  };

//   Add Fiile upload

  return (
    <form className="flex position" onSubmit={submitFormHandler}>
      <input
        placeholder="Send your message..."
        className="w-full focus:outline-none ="
        onChange={(e) => setTextInput(e.target.value)}
        value={textInput}
      />
      <button type="submit"><IoSend /></button>
    </form>
  );
}

export default ChatInput;
