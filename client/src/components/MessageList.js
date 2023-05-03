import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map(message => (
        <li key={message.id}>
          <strong>{message.user.email}: </strong>
          {message.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
