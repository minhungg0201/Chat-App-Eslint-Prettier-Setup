import { useEffect, useRef } from "react";
import { useSockets } from "./context/socket.context";
import MessagesContainer from "./components/Messages";
import RoomsContainer from "./components/Rooms";

const App = () => {
  const { username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSetUsername = () => {
    const { value } = usernameRef.current!;
    if (!value) {
      return;
    }
    setUsername(value);
    localStorage.setItem("username", value);
  };
  useEffect(() => {
    if (usernameRef) {
      usernameRef.current!.value = localStorage.getItem("username") || "";
    }
  }, []);

  return (
    <div>
      {!username && (
        <div className='usernameWrapper'>
          <div className='usernameInner'>
            <input placeholder='Username' ref={usernameRef} />
            <button type='button' className='cta' onClick={handleSetUsername}>
              START
            </button>
          </div>
        </div>
      )}
      {username && (
        <div className='container'>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
};

export default App;
