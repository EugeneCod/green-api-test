import { FormInput } from '@/components/shared';
import { Button } from '@/components/ui';
import { InstanceContext } from '@/contexts';
import { Api } from '@/services/api-client';
import { useContext, useState } from 'react';

export const LogInModal = () => {
  const [idInstanceValue, setIdInstanceValue] = useState('');
  const [apiTokenInstanceValue, setApiTokenInstanceValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const instanceContext = useContext(InstanceContext);

  async function handleLogin() {
    try {
      setLoading(true);
      setErrorMessage('');
      const registrationData = {
        idInstance: idInstanceValue,
        apiTokenInstance: apiTokenInstanceValue,
      };
      const stateInstance = await Api.instance.getState(registrationData);

      if (stateInstance !== 'authorized') {
        setErrorMessage('Аккаунт не авторизован, уточните статус на сайте https://green-api.com/');
        throw new Error('Аккаунт не авторизован, статус:' + stateInstance);
      }
      instanceContext?.updateRegistrationData(registrationData);
    } catch (error) {
      setErrorMessage('Произошла ошибка. Возможно, Вы ввели неверные данные');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`fixed inset-0 flex justify-center items-center`}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleLogin();
        }}
        className="w-100 bg-secondary-bg rounded-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Вход</h1>
        <p className="mb-2 text-center">Введите свои учетные данные из системы GREEN-API</p>
        <div className="flex flex-col gap-y-3 pb-2">
          <FormInput
            label="idInstance"
            value={idInstanceValue}
            onChange={(evt) => {
              setIdInstanceValue(evt.target.value);
            }}
          />
          <FormInput
            label="apiTokenInstance"
            value={apiTokenInstanceValue}
            onChange={(evt) => {
              setApiTokenInstanceValue(evt.target.value);
            }}
            type='password'
          />
        </div>
        <div className="text-xs text-red-600 min-h-4 pb-2">{errorMessage}</div>
        <Button>{loading ? 'Проверка...' : 'Войти'}</Button>
      </form>
    </div>
  );
};