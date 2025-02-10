import { RegistrationData } from '@/@types/green-api';
import { Api } from '@/services/api-client';
import { useEffect, useState } from 'react';

export function useContactUrlAvatar(
  registrationData: RegistrationData | null | undefined,
  contactId: string | undefined,
) {
  const [urlAvatar, setUrlAvatar] = useState('');

  useEffect(() => {
    if (registrationData && contactId) {
      Api.contacts
        .getUrlAvatar(registrationData, contactId)
        .then((urlAvatar) => {
          setUrlAvatar(urlAvatar);
        })
        .catch(console.error);
    }
  }, [registrationData, contactId]);

  return urlAvatar;
}
