import React from 'react';
import { FaEye } from 'react-icons/fa';

interface BtnViewProps {
  on_click: () => void;
  aria_label: string;
}

const BtnView: React.FC<BtnViewProps> = ({ on_click, aria_label }) => {
  return (
    <button
      className="view-button"
      onClick={on_click}
      aria-label={aria_label}
    >
      <FaEye className="view-icon" />
    </button>
  );
};

export default BtnView;