import { useContext } from 'react';

import { IconButton } from '@/components/ui';
import { InstanceContext } from '@/contexts';
import { LogOutIcon } from 'lucide-react';

export const ControlPanel = () => {
  const instanceContext = useContext(InstanceContext);
  return (
    <header className="flex flex-col px-3 py-4 bg-secondary-bg justify-end border-r border-section-border">
      <IconButton
        type="button"
        onClick={() => {
          instanceContext?.removeRegistrationData();
        }}
        IconComponent={LogOutIcon}
        iconProps={{ size: 24 }}
      />
    </header>
  );
};
