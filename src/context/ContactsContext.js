import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ContactsContext = createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [contactGroups, setContactGroups] = useState([]);

  const addGroup = (groupName) => {
    setContactGroups((prevGroups) => [
      ...prevGroups,
      { id: uuidv4(), name: groupName, isActive: true, contacts: [] },
    ]);
  };

  const toggleGroupActive = (groupId) => {
    setContactGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId ? { ...group, isActive: !group.isActive } : group
      )
    );
  };

  const deleteGroup = (groupId) => {
    setContactGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  const addContactToGroup = (groupId, contact) => {
    setContactGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              contacts: [...group.contacts, { ...contact, id: Date.now() }],
            }
          : group
      )
    );
  };

  const editContactInGroup = (groupId, contactId, updatedContact) => {
    setContactGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              contacts: group.contacts.map((contact) =>
                contact.id === contactId
                  ? { ...updatedContact, id: contactId }
                  : contact
              ),
            }
          : group
      )
    );
  };

  const deleteContactFromGroup = (groupId, contactId) => {
    setContactGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              contacts: group.contacts.filter(
                (contact) => contact.id !== contactId
              ),
            }
          : group
      )
    );
  };

  const toggleContactActive = (groupId, contactId) => {
    setContactGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              contacts: group.contacts.map((contact) =>
                contact.id === contactId
                  ? { ...contact, isActive: !contact.isActive }
                  : contact
              ),
            }
          : group
      )
    );
  };

  const value = {
    contactGroups,
    addGroup,
    toggleGroupActive,
    deleteGroup,
    addContactToGroup,
    editContactInGroup,
    deleteContactFromGroup,
    toggleContactActive,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
