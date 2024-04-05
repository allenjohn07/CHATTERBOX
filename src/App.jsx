import React, { useState, useRef, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/Chat/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import './App.css'

const cookies = new Cookies();

function App() {
  const roomInputRef = useRef();

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(cookies.get('room')); // Initialize room state with the value from cookies

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    cookies.remove('room')
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? ( // Check if room exists in state
        <Chat room={room} />
      ) : (
        <div className='room-container'>
          <h2 className='enter-room-label'>Enter Room Name:</h2>
          <div className="room-input-container">
            <input ref={roomInputRef} className='room-input' type="text" />
            <button className='room-input-button'
              onClick={() => {
                const enteredRoom = roomInputRef.current.value;
                if (enteredRoom.trim() !== '') {
                  setRoom(enteredRoom);
                  cookies.set('room', enteredRoom);
                }
              }}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
      <div className='sign-out-button'>
        <button className='sign-out-button' onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );  
}

export default App;
