import React from 'react';

export function ConnectionState({ isConnected }) {
  return <p>State: { isConnected ? "connected" : "not connected" }</p>;
}