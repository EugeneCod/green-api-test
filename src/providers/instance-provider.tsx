import { useState, useEffect, useCallback, useMemo, PropsWithChildren } from 'react';
import { InstanceContext } from '../contexts';

import type { RegistrationData } from '@/@types/green-api';
import { Api } from '@/services/api-client';

export const InstanceProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [instanceChecking, setInstanceChecking] = useState(false);

  const updateRegistrationData = useCallback((data: RegistrationData) => {
    setRegistrationData(data);
    localStorage.setItem('registration', JSON.stringify(data));
  }, []);

  const removeRegistrationData = useCallback(() => {
    setRegistrationData(null);
    localStorage.removeItem('registration');
  }, []);

  useEffect(() => {
    const storageRegistratonString = localStorage.getItem('registration');
    if (storageRegistratonString) {
      setInstanceChecking(true);
      const registrationData = JSON.parse(storageRegistratonString) as RegistrationData;
      Api.instance
        .getState(registrationData)
        .then((stateInstance) => {
          if (stateInstance === 'authorized') {
            setRegistrationData(registrationData);
          }
        })
        .catch(console.error)
        .finally(() => {
          setInstanceChecking(false);
        });
    }
  }, []);

  const cachedValue = useMemo(() => {
    return {
      instanceChecking,
      registrationData,
      updateRegistrationData,
      removeRegistrationData,
    };
  }, [instanceChecking, registrationData, updateRegistrationData, removeRegistrationData]);

  return <InstanceContext value={cachedValue}>{children}</InstanceContext>;
};
