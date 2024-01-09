// src/component/Chat.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../component/Firebase';
import { getDatabase, ref, push, onValue, update, set } from 'firebase/database';

const Chat = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      const database = getDatabase();
      const messagesRef = ref(database, 'messages');
  
      onValue(messagesRef, (snapshot) => {
        const messageList = [];
        snapshot.forEach((childSnapshot) => {
          const messageData = {
            key: childSnapshot.key,
            ...childSnapshot.val(),
          };
          messageList.push(messageData);
        });
        setMessages(messageList);
      });
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

  const getDisplayName = () => {
    if (user.providerData[0].displayName) {
      if (user.providerData[0].displayName) {
        return user.providerData[0].displayName;
      } else if (user.providerData[0].email) {
        // Ambil bagian sebelum "@" dari alamat email
        return user.providerData[0].email.split('@')[0];
      }
    }
    return "Guest"; // Tampilkan "Guest" jika tidak ada informasi pengguna
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const database = getDatabase();
      const messagesRef = ref(database, 'messages');
      const newMessageRef = push(messagesRef);
  
      const updates = {};
      updates[newMessageRef.key] = {
        text: message,
        timestamp: Date.now(),
        user: getDisplayName(), // Gunakan fungsi getDisplayName
      };
  
      update(ref(database, 'messages'), updates);
  
      setMessage('');
    }
  };

  const isCurrentUser = (messageUser) => {
    if (user) {
      const userDisplayName = user.providerData[0].displayName;
      const userEmailPrefix = user.providerData[0].email ? user.providerData[0].email.split('@')[0] : '';
  
      // Cek apakah pengguna yang sedang masuk adalah pemilik pesan
      return (
        (userDisplayName && userDisplayName === messageUser) ||
        (userEmailPrefix && userEmailPrefix === messageUser)
      );
    }
    return false;
  };

  const deleteMessage = (messageKey) => {
    const database = getDatabase();
  const messageRef = ref(database, `messages/${messageKey}`);

  // Hapus pesan hanya jika pengguna yang sedang masuk adalah pemilik pesan
  if (isCurrentUser(messages.find((msg) => msg.key === messageKey)?.user)) {
    set(messageRef, null); // Menggunakan set untuk menghapus pesan
  }
  };
  return (
    <>
    <h1 className='text-2xl font-bold text-red-600' style={{color: localStorage.getItem('Tema')}}>Chat Diskusi</h1>
      <hr className='border-red-600 my-2' style={{borderColor: localStorage.getItem('Tema')}}/>
    <div className='flex flex-col gap-2 '>
        {user ? (
        <form className='sticky top-0 flex gap-2 w-full py-2'>
          <input
            className='w-full border border-red-600 p-2 rounded-md outline-none dark:bg-transparent dark:text-slate-300'
            type="text"
            style={{borderColor: localStorage.getItem('Tema')}}
            value={message}
            placeholder='Tulis pesan disini...'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='bg-red-600 text-white w-fit px-3 py-1 rounded-md' onClick={sendMessage}
          style={{backgroundColor: localStorage.getItem('Tema')}}
          >Send</button>
        </form>
      ) : (
        <div>Please log in to send messages</div>
      )}
      <div className='flex flex-col gap-2'>
        {messages
          .slice(-30)
          .reverse()  
          .map((msg, index) => (
            <div
              key={index}
              className='grid gap-2 bg-red-600 w-fit p-3 text-white rounded-md max-w-xs md:max-w-md'
              style={{
                textAlign: isCurrentUser(msg.user) ? 'right' : 'left',
                marginLeft: isCurrentUser(msg.user) ? 'auto' : '0',
                marginRight: isCurrentUser(msg.user) ? '0' : 'auto',
                backgroundColor: localStorage.getItem('Tema'),
              }}
            >
              <h1 className='text-sm font-extralight'>
                {msg.user}
              </h1>
              <hr />
              <p>{msg.text}</p>
              {isCurrentUser(msg.user) && (
                <button 
                  className='bg-white rounded-md py-1 px-3 w-fit text-red-600 place-self-end'
                  onClick={() => deleteMessage(msg.key)}
                  style={{color: localStorage.getItem('Tema')}}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Chat;
