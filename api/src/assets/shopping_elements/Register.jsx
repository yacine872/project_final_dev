import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formReg, setFormReg] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  });
  const handleSubmitReg = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/register',
        formReg
      );
      const { reg_user } = res.data;
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmitReg}>
          <label>First name:</label>
          <input
            type="text"
            value={formReg.first_name}
            onChange={(e) =>
              setFormReg({ ...formReg, first_name: e.target.value })
            }
          />
          <label>Last name:</label>
          <input
            type="text"
            value={formReg.last_name}
            onChange={(e) =>
              setFormReg({ ...formReg, last_name: e.target.value })
            }
          />
          <label>Username:</label>
          <input
            type="text"
            value={formReg.username}
            onChange={(e) =>
              setFormReg({ ...formReg, username: e.target.value })
            }
          />
          <label>Email:</label>
          <input
            type="email"
            value={formReg.email}
            onChange={(e) => setFormReg({ ...formReg, email: e.target.value })}
          />
          <label>Password:</label>
          <input
            type="password"
            value={formReg.password}
            onChange={(e) =>
              setFormReg({ ...formReg, password: e.target.value })
            }
          />
          <button type="submit">Go to Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
