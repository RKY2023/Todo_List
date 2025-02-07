import * as React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  varient?: 'solid' | 'bordered';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false, varient }) => {

  return (
    <button onClick={onClick} disabled={disabled} className={`hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 ${varient === 'solid'? 'bg-slate-500' : 'bordered'}'}`}>
      {children}
    </button>
  );
};

export default Button;