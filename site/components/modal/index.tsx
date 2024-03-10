// components/Modal.tsx

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (

    <div className=''>
    <div className="fixed bg-[#000000]/80 inset-0 z-50 	 flex items-center justify-center">
      <div className="bg-black/80 justify-center w-1/2 max-md:w-[80%]">
        <header className="p-4">
        <button onClick={onClose} className="float-right mt-[-12px] text-white font-bold hover:bg-red-700 px-2 hover:text-white">X</button>
          
        </header>
            <div className="p-4 bg-white ">
                {children}
            </div>
      </div>
      <div className="">
        </div>
      </div>
    </div>
    );
};

export default Modal;
