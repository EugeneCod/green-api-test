import { cn } from '@/lib/utils/cn';
import type { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithClassName, PropsWithChildren {
  type?: 'submit' | 'button';
  onClick?: VoidFunction;
}

export const Button = (props: ButtonProps) => {
  const { className, children, type = 'submit', onClick } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'bg-emerald-600 text-white w-full py-1 cursor-pointer rounded-md shadow-[0_0_4px_rgb(125,125,125)] hover:opacity-80 transition-opacity duration-150',
        className,
      )}>
      {children}
    </button>
  );
};
