import "./App.css";
import Header from "./components/Header.jsx";
import ContactList from "./components/ContactList";
import { Component } from "react";
import { v4 as uuid } from "uuid";


const LOCAL_STORAGE_KEY = "contact-manager";

class App extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      searchTerm: "",
      searchResults:[]
    };
  }

  

  addContactHandler = (contact) => {
  

    this.setState((prevState) => ({
      contactList: [...prevState.contactList, { id: uuid(), ...contact }],
    }));
  };

  deleteContactHandler = (id) => {
    const newContactList = this.state.contactList.filter(
      (currentContactList) => currentContactList.id !== id
    );

    this.setState({
      contactList: newContactList,
    });

  };

  updateContactHandler = (contact) => {
    this.setState({
      contactList: this.state.contactList.map((contactList) =>
        contact.id === contactList.id ? { ...contact } : contactList
      ),
    });
  };

    searchHandler = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm,
    });
    if(searchTerm !== ""){
      const newContactList = this.state.contactList.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      } );
      this.setState({ searchResults: newContactList });
    }
   
  }

  componentDidUpdate = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.contactList));
  }

  componentWillMount = () => {
    const retrievedContactList = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    if (retrievedContactList) {
      this.setState({
        contactList: retrievedContactList,
      });
    }
  };



  render() {
    return (
      <>
        <Header />
        <ContactList
          // contactList={this.state.contactList}
          contactList={this.state.searchTerm.length < 1 ? this.state.contactList : this.state.searchResults}
          deleteContactHandler={this.deleteContactHandler}
          addContactHandler={this.addContactHandler}
          updateContactHandler={this.updateContactHandler}
          getSearchTerm={this.searchHandler}
          searchTerm={this.state.searchTerm}
        />
      </>
    );
  }
}

export default App;
