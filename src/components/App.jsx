import { GlobalStyle } from './GlobalStyle';
import { nanoid } from 'nanoid'
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { getContactFromLS, saveContactToLS } from 'LocalStorage/conatctsLS';
import { useState, useEffect } from 'react';



export const App = () => {
  
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')
  // const [name, setName] = useState('')
  // const [number, setNumber] = useState('')
  

  
  useEffect(() => {
    if (getContactFromLS()) { setContacts(getContactFromLS()) }
  }, [])
  
  useEffect(() => {
    saveContactToLS(contacts)
  }, [contacts])
  
  const addNewContat = ({ name, number }) => {
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is alredy in contarts`)
      : setContacts(state => [...state, { id: `id-${nanoid()}`, name, number }]
      )
  }
  
  const deleteContact = (id) => setContacts(state => [...state.filter(contact => contact.id !== id)])
  return (
    <>
      <Phonebook title="Phonebook"
        addContat={addNewContat}
      />
      {contacts.length > 0 && <Contacts title="Contacts"
        contactsList={contacts}
        filterChanger={setFilter}
        filter={filter}
        deleter={deleteContact}
      />}
      <GlobalStyle />
    </>
  );
};
