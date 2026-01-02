import React from 'react';
import { Link } from 'react-router';

function Originalpage() {
  return (
    <div>
      <Link>
        {' '}
        <button to="register">Register</button>
      </Link>
      <Link>
        {' '}
        <button to="login">Login</button>
      </Link>
    </div>
  );
}

export default Originalpage;
