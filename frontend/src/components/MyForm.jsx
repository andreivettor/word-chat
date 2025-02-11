import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

export const MyForm = ({setChatEvents}) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const listener = event => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSubmit();
      }
    };
    
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [value]);

  const onSubmit = () => {
    if(value === '') return;

    setIsLoading(true);

    socket.timeout(5000).emit('chat', value, (err) => {
      if(err) {
        // TODO: warn user
        alert(err);
      }
      else {
        setChatEvents(messages => [...messages, value]);
        setValue('');
      }

      setIsLoading(false);
    });
  }

  const onInputChange = (value) => {
    setValue(value)
  }

  return (
    <div>
      <input className="chat-input" value={value} onChange={ e => onInputChange(e.target.value) } />
      <button onClick={onSubmit} disabled={ isLoading }>Submit</button>
    </div>
  );
}
