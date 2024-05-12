import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white flex flex-col items-center justify-center relative px-4 py-6 rounded-md pb-8">
        <XMarkIcon
          className="w-5 h-5 absolute top-2 right-1 hover:cursor-pointer"
          onClick={onClose}
        />
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
