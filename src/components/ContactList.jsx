import React, { Component } from "react";
import MyVerticallyCenteredModal from "./Modal";
import ContactCard from "./ContactCard";

export class ContactList extends Component {
  constructor(props) {
    super(props);
   

    this.state = {
      show: false,
    };
  }

  btnHandler = () => {
    this.setState({
      show: true,
    });
  };

  searchThis = (e) => {
    this.props.getSearchTerm(e.target.value);
    
  }

  render() {
     const {
       contactList,
       deleteContactHandler,
       addContactHandler,
       updateContactHandler,
       searchTerm,
     } = this.props;

    return (
      <>
        <div className="container d-flex flex-column">
          <div className=" d-flex justify-content-between my-3">
            <h3>ContactList</h3>
            <button className="btn btn-primary" onClick={this.btnHandler}>
              Add Contact
            </button>
          </div>
          <div>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={this.searchThis}
            ></input>
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          isEditMode={false}
          addContactHandler={addContactHandler}
        />

        <div className="ui celled list ">
          <div className="item container ">
            <div className="content-class">
              <div className="custom-content name-container w-20 ">
                <div className="content">
                  <div className=" font-weight-bold p-10">Name</div>
                </div>
              </div>
              <div className="custom-content w-20 font-weight-bold">Email</div>
              <div className="custom-content w-15 font-weight-bold">
                Contact Number
              </div>
              <div className="custom-content w-10 font-weight-bold">Gender</div>
              <div className="custom-content w-25 font-weight-bold">
                Address
              </div>
            </div>
            <div className="custom-content editable-class ">
              <i className=" alternate outline icon"></i>
              <i className=" alternate outline icon"></i>
            </div>
          </div>

          {contactList.length > 0 ? (
            contactList.map((contact) => {
              return (
                <ContactCard
                  key={contact.id}
                  id={contact.id}
                  userName={contact.userName}
                  email={contact.email}
                  gender={contact.gender}
                  address={contact.address}
                  contactNumber={contact.contactNumber}
                  updateContactHandler={updateContactHandler}
                  deleteContactHandler={deleteContactHandler}
                  show={this.state.show}
                />
              );
            })
          ) : (
            <h4 className="container text-center">No contact found</h4>
          )}
        </div>
      </>
    );
  }
}

export default ContactList;
