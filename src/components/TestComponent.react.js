import React from 'react';
import { Link } from 'react-router';

export default function TestComponent() {
  return (
    <div>
      <h2>This is a brand new page</h2>
      <Link to="/">Home</Link>
    </div>
  );
}
