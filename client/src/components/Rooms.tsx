import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    // get the room name
    const roomName = newRoomRef.current!.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current!.value = "";
  }

  function handleJoinRoom(key: any) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className='wrapper'>
      <div className='createRoomWrapper'>
        <input ref={newRoomRef} placeholder='Room name' />
        <button className='cta' type='button' onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

      <ul className='roomList'>
        {rooms!.map((room) => {
          return (
            <div key={room.roomId}>
              <button
                type='button'
                // disabled={key === roomId}
                onClick={() => handleJoinRoom(roomId)}
              >
                {room.name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
