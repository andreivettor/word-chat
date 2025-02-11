import React, { useState } from 'react';
import { socket } from '../socket';

export const MyForm = ({setChatEvents}) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    if(value === '') return;

    event.preventDefault();
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
