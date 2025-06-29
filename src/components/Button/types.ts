import type { ReactNode, MouseEvent } from 'react';

export type ButtonProps = {
  ariaLabel?: string;
  anchorTarget?: string;
  hasIconOnly?: boolean;
  title?: string | ReactNode;
  onClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};
