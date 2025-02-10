import type { RegistrationData } from '@/@types/green-api';
import { axiosInstance } from '../instance';
import type { AvatarDTO, CheckWhatsappDTO, ContactDTO } from '../dto/contact';

export const getAll = async ({ idInstance, apiTokenInstance }: RegistrationData) => {
  const { data } = await axiosInstance.get<ContactDTO[]>(
    `/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );

  return data;
};

export const checkWhatsapp = async (
  { idInstance, apiTokenInstance }: RegistrationData,
  phoneNumber: number,
) => {
  const { data } = await axiosInstance.post<CheckWhatsappDTO>(
    `/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
    { phoneNumber },
  );

  return data.existsWhatsapp;
};

export const getUrlAvatar = async (
  { idInstance, apiTokenInstance }: RegistrationData,
  chatId: string,
) => {
  const { data } = await axiosInstance.post<AvatarDTO>(
    `/waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
    { chatId },
  );

  return data.urlAvatar;
};
