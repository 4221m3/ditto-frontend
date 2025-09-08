import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface BtnExitProps {
  onClick: () => void;
  ariaLabel: string;
}

const BtnExit: React.FC<BtnExitProps> = ({ onClick, ariaLabel }) => {
  return (
    <button
      className="exit-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <FaArrowLeft className="exit-icon" />
    </button>
  );
};

export default BtnExit;