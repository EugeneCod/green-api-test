/* import { useState } from 'react'; */
import { FormInput } from '@/components/shared';
import { Button } from '@/components/ui';

function App() {
  /* const [loggedIn, setLoggenIn] = useState(false); */
  return (
    <div className="bg-primary-bg">
      {/* register page */}
      <div className={`fixed inset-0 flex justify-center items-center`}>
        <div className="w-100 bg-secondary-bg rounded-md p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Вход</h1>
          <p className="mb-2 text-center">Введите свои учетные данные из системы GREEN-API</p>
          <div className="flex flex-col gap-y-3 pb-8">
            <FormInput  label="idInstance" />
            <FormInput label="apiTokenInstance" />
          </div>
          <Button>Отправить</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
