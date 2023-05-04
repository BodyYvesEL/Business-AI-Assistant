import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';

const Chatbot = ({ auth }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/api/messages', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMessages();
  }, [auth.token]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const fileMessage = {
          text: res.data.name,
          fileUrl: res.data.url,
        };
        const messageRes = await axios.post('/api/messages', fileMessage, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setMessages(messages => [...messages, messageRes.data]);
        setFile(null);
      }
      if (input) {
        const textMessage = {
          text: input,
        };
        const messageRes = await axios.post('/api/messages', textMessage, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setMessages(messages => [...messages, messageRes.data]);
        setInput('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <MessageList messages={messages} />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chatbot;
