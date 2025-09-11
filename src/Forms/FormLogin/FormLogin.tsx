import React from 'react';
import { useState } from 'react';

import { auth_store } from '../../store/auth.tsx';

import './FormLogin.css';

export const FormLogin: React.FC = () => {

  const [username, set_username] = useState<string>('');
  const [password, set_password] = useState<string>('');

  const [error, set_error] = useState<string>('');
  const [loading, set_loading] = useState<boolean>(false);

  const set_token = auth_store((state) => state.set_token);
  
  const handle_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    set_loading(true);
    set_error('');

    const form_data = new URLSearchParams();

    form_data.append('username', username);
    form_data.append('password', password);

    try {
      const response = await fetch(
        'http://localhost:8000/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: form_data.toString(),
        }
      );

      if (!response.ok) {
        throw new Error('Invalid username or password.');
      } else {
        const response_json: TokenResponse = await response.json();
        set_token(response_json.access_token);
        window.location.href = '/jobs';
      }
    } catch (error: any) {
      set_error(error.message);
    } finally {
      set_loading(false);
    }
  };

  return (
    <div className='login-card'>
      <h2 className='form-title'>Login</h2>
      <form onSubmit={handle_submit} className='login-form'>
        <input
          type="text"
          value={username}
          onChange={(e) => set_username(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => set_password(e.target.value)}
          placeholder="password"
          required
        />
        <button
          className='btn-login'
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className='signup-redirect'>Need an account? <a href='/signup'>Sign up</a></p>
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

interface TokenResponse {
  access_token: string;
  token_type: string;
}