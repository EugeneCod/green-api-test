import { cn } from '@/lib/utils/cn';
import type { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithClassName, PropsWithChildren {}

export const Container = (props: ContainerProps) => {
  const { className, children } = props;
  return <div className={cn('mx-auto max-w-[1440px]', className)}>{children}</div>;
};
