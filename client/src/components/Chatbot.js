import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';

const Chatbot = ({ auth }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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
      const res = await axios.post(
        '/api/messages',
        {
          text: input,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setMessages(messages => [...messages, res.data]);
      setInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <MessageList messages={messages} />
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chatbot;
