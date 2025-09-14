import React from 'react';

import { IoAdd } from 'react-icons/io5';

//#region Component

export const BtnNodeAdd: React.FC<Props> = ({ on_click, aria_label }) => {
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

//#endregion

//#region Props
interface Props {
  on_click: () => void;
  aria_label: string;
}

//#endregion