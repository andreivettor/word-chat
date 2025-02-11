import React from 'react';

export function Events({ events }) {
  return (
    <div className='chatbox'>
      <ul>
      {
        events.map((event, index) =>
          <li key={ index }>{ `> ${event}` }</li>
        )
      }
      </ul>
    </div>
  );
}