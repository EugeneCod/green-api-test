import { useContext, useState } from 'react';
import { UserPlusIcon } from 'lucide-react';

import { ContactListItem, FormInput } from '@/components/shared';
import { IconButton } from '@/components/ui';
import { Api } from '@/services/api-client';
import { InstanceContext } from '@/contexts';
import { BriefInfoContact } from '@/@types/green-api';
import { PERSONAL_CHAT_ID_ENDING } from '@/lib/constants/api';

interface ContactsProps {
  selectedContact: BriefInfoContact | null;
  onSelectContact: (contact: BriefInfoContact) => void;
}

export const Contacts = (props: ContactsProps) => {
  const { selectedContact, onSelectContact } = props;
  const [contacts, setContacts] = useState<BriefInfoContact[]>([]);
  const [contactPhoneValue, setContactPhoneValue] = useState('');

  const instanceContext = useContext(InstanceContext);

  function convertPhoneNumber(phoneNumber: string) {
    let newNumber = phoneNumber;
    if (newNumber.length === 11) {
      newNumber = '+' + newNumber;
    }
    const code = newNumber.slice(0, 2);
    const operator = newNumber.slice(2, 5);
    const startGroup = newNumber.slice(5, 8);
    const middleGroup = newNumber.slice(8, 10);
    const endGroup = newNumber.slice(10);
    return `${code} ${operator} ${startGroup}-${middleGroup}-${endGroup}`;
  }

  /* Нет необходимости в рамках задания */
  /* const getPhoneNumberFromId = useCallback((id: string) => {
    const number = id.split('@')[0];

    return convertPhoneNumber(number);
  }, []); */

  /* useEffect(() => {
    if (instanceContext?.registrationData) {
      Api.contacts
        .getAll(instanceContext.registrationData)
        .then((contacts) => {
          const userTypeContacts: BriefInfoContact[] = contacts
            .filter((contact) => contact.type === 'user')
            .map((contact) => ({
              id: contact.id,
              name: contact.name,
              phoneNumber: getPhoneNumberFromId(contact.id),
            }));
          setContacts(userTypeContacts);
        })
        .catch(console.error);
    }
  }, [instanceContext?.registrationData, getPhoneNumberFromId]); */

  async function handleAddContact() {
    if (!instanceContext?.registrationData || contactPhoneValue.length < 11) {
      return;
    }
    const phoneNumber = +contactPhoneValue;
    if (!isFinite(phoneNumber)) {
      return;
    }
    const newContactId = contactPhoneValue + PERSONAL_CHAT_ID_ENDING;
    if (contacts.some((contact) => contact.id === newContactId)) {
      return;
    }

    try {
      const existsWhatsapp = await Api.contacts.checkWhatsapp(
        instanceContext.registrationData,
        phoneNumber,
      );
      if (!existsWhatsapp) {
        throw new Error('Нет аккаунта WhatsApp на номере телефона');
      }
      const newContact: BriefInfoContact = {
        id: contactPhoneValue + PERSONAL_CHAT_ID_ENDING,
        phoneNumber: convertPhoneNumber(contactPhoneValue),
        name: '',
      };

      setContacts([...contacts, newContact]);
      setContactPhoneValue('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col pt-4 h-screen">
      <h1 className="text-2xl font-bold mb-2 px-2">Контакты</h1>
      {/* Добавление контактов */}
      <p className="text-secondary-txt text-xs mb-2 px-2">
        Для добавления контакта укажите номер телефона в международном формате: 11 или 12 цифр;
        Пример: 79008007060 или 380123456789
      </p>

      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleAddContact();
        }}
        className="flex gap-x-1 mb-8 px-2">
        <FormInput
          value={contactPhoneValue}
          onChange={(evt) => {
            setContactPhoneValue(evt.target.value);
          }}
          label="Добавить контакт"
          className="bg-secondary-bg"
        />
        <IconButton
          className="self-end"
          type="submit"
          IconComponent={UserPlusIcon}
          iconProps={{ size: 20 }}
        />
      </form>

      {/* Список контактов */}
      <ul className="flex-auto overflow-y-auto scrollbar-custom">
        {contacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            selected={contact.id === selectedContact?.id}
            onSelect={onSelectContact}
            contact={contact}
          />
        ))}
      </ul>
    </div>
  );
};
