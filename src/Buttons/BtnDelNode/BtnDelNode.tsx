import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface DeleteButtonProps {
  on_click: () => void;
  aria_label: string;
}

const BtnDelNode: React.FC<DeleteButtonProps> = ({ on_click, aria_label }) => {
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

export default BtnDelNode;