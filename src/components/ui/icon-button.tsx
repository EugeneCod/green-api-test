import { cn } from '@/lib/utils/cn';
import { LucideProps } from 'lucide-react';

interface IconButtonProps extends PropsWithClassName {
  type?: 'submit' | 'button';
  onClick?: VoidFunction;
  IconComponent: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  iconProps?: Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>;
}

export const IconButton = (props: IconButtonProps) => {
  const { className, type = 'submit', onClick, IconComponent, iconProps } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'p-2 text-secondary-txt cursor-pointer hover:text-primary-txt transition-text duration-200',
        className,
      )}>
      <IconComponent {...iconProps} />
    </button>
  );
};
