import { RegistrationData } from '@/@types/green-api';
import { createContext } from 'react';

interface InstanceContextType {
  instanceChecking: boolean;
  registrationData: RegistrationData | null;
  updateRegistrationData: (data: RegistrationData) => void;
  removeRegistrationData: VoidFunction;
}

export const InstanceContext = createContext<InstanceContextType | undefined>(undefined);
