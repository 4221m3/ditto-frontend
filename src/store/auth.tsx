
import { create } from 'zustand';

export const auth_store = create<StateAuth>((set) => ({

  // When the auth store is called without evoking any
  // method, the token is read from `local_storage`.
  token: localStorage.getItem('access_token'),

  // The `set` method interacts with the app's global state.
  // The `set_token` allows to interact with the local storage.
  set_token: (token) => {

    // The app's global state is updated to include the token.
    set({ token });

    // If a token is passed, it's added to the local 
    // storage, else, the variable ceases to exist.
    if (token) {
      localStorage.setItem('access_token', token);

    } else {
      localStorage.removeItem('access_token');
    }
  },

  // The `clear_token` allows to reset the app's global
  // state and erase the token from the local storage.
  clear_token: () => {
    set({ token: null });
    localStorage.removeItem('access_token');
  },

}));

interface StateAuth {
  token: string | null;
  set_token: (token: string | null) => void;
  clear_token: () => void;
}