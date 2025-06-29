import React, { type MouseEvent } from 'react';
import type { ButtonProps } from './types.ts';

const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  anchorTarget,
  hasIconOnly,
  title,
  onClickHandler,
  className = '',
  disabled = false,
}) => {
  return (
    <>
      <button
        aria-label={ariaLabel ? ariaLabel : undefined}
        disabled={disabled}
        className={` ${className}`}
        onClick={(event: MouseEvent<HTMLButtonElement>) =>
          onClickHandler(event)
        }
        {...(anchorTarget ? { 'anchor-target': anchorTarget } : {})}
      >
        {hasIconOnly ? <span>{title}</span> : title}
      </button>
    </>
  );
};

export default Button;
