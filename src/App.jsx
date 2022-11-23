import { useState } from "react";
import contactsJson from "./contacts.json";
import "./App.css";
let firstFive = contactsJson.slice(0, 5);
const remainingContacts = contactsJson.slice(5);

function App() {
  const [contacts, setContacts] = useState(firstFive);

  const addRandomContact = () => {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    setContacts((currContacts) => [...currContacts, randomContact]);
  };

  const sortByName = () => {
    const copy = [...contacts];
    copy.sort((a, b) => {
      return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    });
    setContacts(copy);
  };
  const sortByPopularity = () => {
    const copy = [...contacts];
    copy.sort((a, b) => {
      return a.name < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0;
    });
    setContacts(copy);
  };

  const deleteContact = (contactId) => {
    const copy = [...contacts];
    const filteredList = copy.filter((eachPerson) =>
      eachPerson.id === contactId ? false : true
    );

    setContacts(filteredList);
  };
  return (
    <div className="App">
      <button onClick={addRandomContact}>Add a contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => {
            return (
              <tr>
                <td>
                  <img src={contact.pictureUrl} alt="" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? "🏆" : " "}</td>
                <td>{contact.wonEmmy ? "🏆" : " "}</td>

                <button
                  onClick={() => {
                    deleteContact(contact.id);
                  }}
                >
                  Delete
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
