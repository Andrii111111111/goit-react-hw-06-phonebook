
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { HeaderTitle, ContactsTitle } from './Header.style';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../redux/store';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const isNameAlreadyExists = name => {
    const lowerCaseName = name.toLowerCase();
    return contacts.some(contact => contact.name.toLowerCase() === lowerCaseName);
  };

  const addNewContact = newContact => {
    dispatch(addContact(newContact));
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const renderHeader = () => (
    <span>
      <HeaderTitle>Телефонна книга</HeaderTitle>
    </span>
  );

  const renderContactsTitle = () => (
    <span>
      <ContactsTitle>Контакти</ContactsTitle>
    </span>
  );

  const renderPersistGate = children => (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );

  return (
    <div className="App">
      {renderHeader()}
      {renderPersistGate(
        <ContactForm onSubmit={addNewContact} isNameAlreadyExists={isNameAlreadyExists} />
      )}
      {renderContactsTitle()}
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={removeContact} />
    </div>
  );
};







