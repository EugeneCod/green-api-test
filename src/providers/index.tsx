import { InstanceProvider } from './instance-provider';

import type { PropsWithChildren } from 'react';

const Providers = (props: PropsWithChildren) => {
  const { children } = props;

  return <InstanceProvider>{children}</InstanceProvider>;
};

export default Providers
