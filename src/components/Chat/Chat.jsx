import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import Cookies from 'universal-cookie';
import './Chat.css'

const cookies = new Cookies();

function Chat(props) {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");
    const { room } = props;

    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messagesArray = [];
            snapshot.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messagesArray);
        });
        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messageRef, {
            user: auth.currentUser.displayName,
            createdAt: serverTimestamp(),
            text: newMessage,
            room,
        });
        setNewMessage("");
    }

    const exitRoom = () => {
        cookies.remove('room');
        window.location.reload(); // Reload the page to show the enter room input box
    }

    return (
        <div className='page-container'>
          <div className='heading-container'>
            <h1 className='chat-h1'>Welcome to: {room}</h1>
            <button onClick={exitRoom} className='exit-button'>Exit Room</button>
          </div>
          <div className='chat-container'>
            <div className='messages-here'><span><i>Your messages here...</i></span></div>
            <div className='messages-container'>
              {messages.map((message, index) => (
                <div className='message' key={index}>
                  <span className='user'><b>{message.user}: </b></span>
                  <span className='text'>{message.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='input-container'>
            <form onSubmit={handleSubmit} className='new-message-form' action="">
              <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='new-message-input' placeholder='Type your message here' type="text" />
              <button type='submit' className='send-button'>Send</button>
            </form>
          </div>
        </div>
      );
      
      

}

export default Chat;


