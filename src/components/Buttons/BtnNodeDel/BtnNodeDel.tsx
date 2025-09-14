import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export const BtnNodeDel: React.FC<Props> = ({ on_click, aria_label }) => {
  return (
    <button
      className="delete-button"
      onClick={on_click}
      aria-label={aria_label}
    >
      <FaTrashAlt className="delete-icon" />
    </button>
  );
};

interface Props {
  on_click: () => void;
  aria_label: string;
}