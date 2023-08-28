import React, { useState } from "react";
import { useContacts } from "../../context/ContactsContext";
import Pagination from "../UI/Pagination";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Group.css";

function Group() {
  const {
    contactGroups,
    addGroup,
    deleteGroup,
    toggleGroupActive,
    addContactToGroup,
    toggleContactActive,
    deleteContactFromGroup,
  } = useContacts();

  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGroups = contactGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedContacts =
    contactGroups.find((group) => group.id === selectedGroupId)?.contacts || [];
  const filteredContacts = displayedContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.isActive ? "active" : "inactive").includes(
        searchQuery.toLowerCase()
      )
  );

  const handleAddGroup = () => {
    if (groupName.trim()) {
      addGroup(groupName);
      setGroupName("");
    } else {
      alert("Group name cannot be empty");
    }
  };

  const handleDeleteGroup = (id) => {
    deleteGroup(id);
    if (id === selectedGroupId) {
      setSelectedGroupId(null);
    }
  };

  const handleToggleActiveStatus = (id) => {
    toggleGroupActive(id);
  };

  const handleAddContact = () => {
    if (contactData.name.trim() && selectedGroupId) {
      const newContact = {
        ...contactData,
        groupId: selectedGroupId,
        id: Date.now(),
        isActive: true,
      };
      addContactToGroup(selectedGroupId, newContact);
      setContactData({ name: "", email: "", phone: "" });
    } else {
      alert("Contact name cannot be empty or no group selected");
    }
  };

  const handleToggleContactStatus = (contactId) => {
    toggleContactActive(selectedGroupId, contactId);
  };

  const handleDeleteContact = (contactId) => {
    deleteContactFromGroup(selectedGroupId, contactId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const contactsToDisplay = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedContacts = [...contactsToDisplay].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="group-container">
      <div className="group-inputs">
        <input
          className="input-field"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
        />
        <button className="button" onClick={handleAddGroup}>
          Add Group
        </button>
      </div>

      <ul className="group-list">
        {contactGroups.map((group) => (
          <li className="group-tab" key={group.id}>
            <span
              className="group-name"
              onClick={() => setSelectedGroupId(group.id)}
            >
              {group.name} - {group.isActive ? "Active" : "Inactive"}
            </span>

            <button onClick={() => handleToggleActiveStatus(group.id)}>
              Toggle Active
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteGroup(group.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedGroupId && (
        <>
          <h2>Add Contacts to Group</h2>
          <div className="group-inputs">
            <select
              className="input-field"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
            >
              <option value="">Select a group</option>
              {contactGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

            <input
              className="input-field"
              value={contactData.name}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
            />
            <input
              className="input-field"
              value={contactData.email}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
            />
            <input
              className="input-field"
              value={contactData.phone}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Phone"
            />
            <button onClick={handleAddContact}>Add Contact</button>
          </div>

          <div className="group-inputs">
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name, email, or status"
            />
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>
                  <button onClick={() => handleSort("name")}>Name</button>
                </th>
                <th>
                  <button onClick={() => handleSort("isActive")}>Status</button>
                </th>
                <th>
                  <button onClick={() => handleSort("email")}>Email</button>
                </th>
                <th>
                  <button onClick={() => handleSort("phone")}>Phone</button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.isActive ? "Active" : "Inactive"}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td className="contact-action-btns">
                    <button
                      onClick={() => handleToggleContactStatus(contact.id)}
                    >
                      Toggle Active
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            className="pagination"
            totalItems={filteredContacts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Group;
