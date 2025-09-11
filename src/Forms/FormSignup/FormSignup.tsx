import React from 'react';
import { useState } from 'react';

import './FormSignup.css';

export const FormSignup: React.FC = () => {
  const [name_first, set_name_first] = useState<string>('');
  const [name_last, set_name_last] = useState<string>('');
  const [email, set_email] = useState<string>('');
  const [username, set_username] = useState<string>('');
  const [password, set_password] = useState<string>('');
  const [error, set_error] = useState<string>('');
  const [loading, set_loading] = useState<boolean>(false);

  const handle_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    set_loading(true);
    set_error('');

    const form_data = {
      'name_first': name_first,
      'name_last': name_last,
      'email': email,
      'username': username,
      'password': password,
    };

    try {
      const response = await fetch(
        'http://localhost:8000/users/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form_data),
        }
      );

      if (!response.ok) {
        const error_msg = await response.json();
        throw new Error(error_msg.detail);
      } else {
        window.location.href = '/login';
      }
    } catch (error: any) {
      set_error(error.message);
    } finally {
      set_loading(false);
    }
  };

  return (
    <div className="signup-card">
      <h2 className='form-title'>Sign up</h2>
      <form onSubmit={handle_submit} className='signup-form'>
        <input
          type="text"
          value={name_first}
          onChange={(e) => {
            set_name_first(e.target.value);
          }}
          placeholder="Jhon"
          required
        />
        <input
          type="text"
          value={name_last}
          onChange={(e) => {
            set_name_last(e.target.value);
          }}
          placeholder="Doe"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => {
            set_email(e.target.value);
            set_username(e.target.value);
          }}
          placeholder="jhondoe@example.com"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => set_password(e.target.value)}
          placeholder="superhardrpassword123"
          required
        />
        <button
          className="btn-signup"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>

      <p className='login-redirect'>Have an account? <a href='/login'>Login</a></p>

      {error && <p className='error-message'>{error}</p>}

    </div>
  );
};