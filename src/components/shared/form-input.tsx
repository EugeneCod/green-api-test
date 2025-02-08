import type { InputHTMLAttributes, Ref } from 'react';

import { Input } from '../ui';
import { cn } from '@/lib/utils/cn';

interface FormInputProps extends PropsWithClassName, InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  name?: string;
  label?: string;
}

export const FormInput = (props: FormInputProps) => {
  const { className, name, label, ref, ...restInputProps } = props;
  return (
    <div className="flex flex-col w-full gap-y-0.5">
      {label && <label className='' htmlFor={name}>{label}</label>}
      <Input
        ref={ref}
        id={name}
        className={cn(className)}
        {...restInputProps}
      />
    </div>
  );
};
