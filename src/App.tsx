import { useState, useContext } from 'react';
import { Container, Preloader } from '@/components/shared';
import { ChatWindow, Contacts, ControlPanel, LogInModal } from '@/modules';
import { BriefInfoContact } from '@/@types/green-api';
import { InstanceContext } from './contexts';

function App() {
  const [selectedContact, setSelectedContact] = useState<BriefInfoContact | null>(null);

  const instanceContext = useContext(InstanceContext);

  if (instanceContext?.instanceChecking) {
    return (
      <main className="bg-primary-bg">
        <div className={`fixed inset-0 flex justify-center items-center`}>
          <Preloader />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-primary-bg">
      {!instanceContext?.registrationData ? (
        <LogInModal />
      ) : (
        <Container className="grid grid-cols-[min-content_minmax(350px,_1fr)_minmax(350px,_2fr)] min-h-screen">
          <ControlPanel />
          <Contacts selectedContact={selectedContact} onSelectContact={setSelectedContact} />
          <ChatWindow contact={selectedContact} />
        </Container>
      )}
    </main>
  );
}

export default App;
