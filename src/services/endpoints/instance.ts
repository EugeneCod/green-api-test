import { axiosInstance } from '../instance';

import type { InstanceStateDTO } from '../dto/instance';
import type { RegistrationData } from '@/@types/green-api';

export const getState = async ({ idInstance, apiTokenInstance }: RegistrationData) => {
  const { data } = await axiosInstance.get<InstanceStateDTO>(
    `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
  );

  return data.stateInstance;
};
