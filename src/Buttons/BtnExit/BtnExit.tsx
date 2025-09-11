import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

//#region Components

export const BtnExit: React.FC<Props> = ({ onClick, ariaLabel }) => {
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

//#endregion

//#region Props
interface Props {
  onClick: () => void;
  ariaLabel: string;
}

//#endregion