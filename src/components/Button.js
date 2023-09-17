import React from 'react';
import './button.css';
const Button = ({ up, onClick }) => {
  const getButton = (type) => {
    if (up) return <span>&#8593;</span>;
    else return <span>&#8595;</span>;
  };

  return (
    <div class="button" onClick={onClick}>
      {getButton(up)}
    </div>
  );
};

export default Button;
