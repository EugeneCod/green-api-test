import { cn } from '@/lib/utils/cn';
import type { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithClassName, PropsWithChildren {
  type?: 'submit' | 'button';
}

export const Button = (props: ButtonProps) => {
  const { className, children, type = 'submit' } = props;
  return (
    <button type={type} className={cn('bg-emerald-600 text-white w-full py-1 cursor-pointer rounded-md shadow-[0_0_4px_rgb(125,125,125)] hover:opacity-80 transition-opacity duration-150', className)}>
      {children}
    </button>
  );
};

/* background-color: var(--light-primary-color);
    border-color: var(--light-primary-color);
    box-shadow: 0 0 4px #999;
    outline: none;  shadow-[0 0 4px #999]*/