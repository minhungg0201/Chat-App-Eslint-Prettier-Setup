import { useEffect, useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLInputElement>(null);

  function handleSendMessage() {
    const message = newMessageRef.current!.value;

    if (!String(message).trim()) {
      return;
    }

    /*
     * When an user sends a room message
     */
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages!,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current!.value = "";
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <div className='wrapper'>
      <div className='messageList'>
        {messages!.map(({ message, username, time }, index) => {
          return (
            <div key={index} className='message'>
              <div key={index} className='messageInner'>
                <span className='messageSender'>
                  {username} - {time}
                </span>
                <span className='messageBody'>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className='messageBox'>
        <textarea
          rows={1}
          placeholder='Tell us what you are thinking'
          ref={newMessageRef}
        />
        <button type='button' onClick={handleSendMessage}>
          SEND
        </button>
      </div>
    </div>
  );
}

export default MessagesContainer;
