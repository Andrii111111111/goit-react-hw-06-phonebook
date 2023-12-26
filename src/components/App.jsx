

import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { HeaderTitle, ContactsTitle } from './Header.style';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../redux/store';

export const App = () => {
  

  return (
    <div className="App">
      <span>
        <HeaderTitle>Телефонна книга</HeaderTitle>
      </span>
      <PersistGate loading={null} persistor={persistor}>
        <ContactForm />
      </PersistGate>
      <span>
        <ContactsTitle>Контакти</ContactsTitle>
      </span>
      <Filter />
      <ContactList />
    </div>
  );
};







