import type { ChangeEvent, InputHTMLAttributes, Ref } from 'react';

import { Input } from '../ui';
import { cn } from '@/lib/utils/cn';

interface FormInputProps extends PropsWithClassName, InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  value?: string;
  name?: string;
  label?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = (props: FormInputProps) => {
  const { className, name, label, ref, onChange, ...restInputProps } = props;
  return (
    <div className="flex flex-col w-full gap-y-0.5">
      {label && (
        <label className="" htmlFor={name}>
          {label}
        </label>
      )}
      <Input ref={ref} id={name} onChange={onChange} className={cn(className)} {...restInputProps} />
    </div>
  );
};
