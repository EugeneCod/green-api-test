import type { ChangeEvent, InputHTMLAttributes, Ref } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends PropsWithClassName, InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const { className, ref, onChange, ...restInputProps } = props;
  return (
    <input
      onChange={onChange}
      ref={ref}
      className={cn('flex text-input rounded-md bg-primary-bg px-4 py-1 outline-0 border border-transparent hover:border-emerald-600 focus:shadow-[0_0_4px_rgb(125,125,125)]', className)}
      {...restInputProps}
    />
  );
};
