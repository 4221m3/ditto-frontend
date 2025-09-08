import React from 'react';
import { IoAdd } from 'react-icons/io5';

interface PlusButtonProps {
  on_click: () => void;
  aria_label: string;
}

const BtnAddNode: React.FC<PlusButtonProps> = ({ on_click, aria_label }) => {
  return (
    <button
      className="plus-button"
      onClick={on_click}
      aria-label={aria_label}
    >
      <IoAdd className="plus-icon" />
    </button>
  );
};

export default BtnAddNode;