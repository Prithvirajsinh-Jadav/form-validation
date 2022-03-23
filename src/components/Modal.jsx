import { Modal } from "react-bootstrap";
import React, { Component } from "react";

let currentUserLength = 0;
let currentEmailLength = 0;
let currentContactNumberLength = 0;
let currentAddressLength = 0;

class MyVerticallyCenteredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: "",
      email: "",
      contactNumber: "",
      gender: "",
      address: "",
      formErrors: {},
    };
  }

  componentWillReceiveProps = () => {
    if (this.props.isEditMode) {
      this.setState({
        id: this.props.id,
        userName: this.props.userName,
        email: this.props.email,
        contactNumber: this.props.contactNumber,
        gender: this.props.gender,
        address: this.props.address,
      });
    }
  };

  onHide = () => {
    this.props.onHide();
    this.setState({
      userName: "",
      email: "",
      contactNumber: "",
      gender: "",
      address: "",
      formErrors: {},
    });
    currentUserLength = 0;
    currentEmailLength = 0;
    currentContactNumberLength = 0;
    currentAddressLength = 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(
      {
        formErrors: this.validate({
          user_name: this.state.userName,
          email: this.state.email,
          contact_number: this.state.contactNumber,
          gender: this.state.gender,
          address: this.state.address,
        }),
      },
      () => {
        console.log("i m exe handling 1");

        const isNullish = Object.values(this.state.formErrors).every((value) => {
          if (value === undefined) {
            return true;
          }

          return false;
        });
        if (isNullish) {
          if (this.props.isEditMode) {
            this.props.updateContactHandler({
              id: this.state.id,
              userName: this.state.userName,
              email: this.state.email,
              contactNumber: this.state.contactNumber,
              gender: this.state.gender,
              address: this.state.address,
            });
            this.onHide();
          } else {
            this.props.addContactHandler({
              userName: this.state.userName,
              email: this.state.email,
              contactNumber: this.state.contactNumber,
              gender: this.state.gender,
              address: this.state.address,
            });
            this.onHide();
          }
        }
      }
    );
  };



  validateUserName = (values) => {
    const errors = {};
    if (!values.user_name) {
      errors.user_name = "Username is required!";
    } else if (!(values.user_name.length > 3 && values.user_name.length < 60)) {
      errors.user_name = "Not a valid name";
    }
    return errors;
  };

  validateEmail = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };

  validateGender = (values) => {
    const errors = {};

    if (!values.gender) {
      errors.gender = "Gender is required!";
    }
    return errors;
  };

  validateContactNumber = (values) => {
    const errors = {};
    if (values.contact_number.length !== 10) {
      errors.contact_number = "Pls enter valid length of mobile number";
    } else if (values.contact_number < 0) {
      errors.contact_number = "Pls enter valid mobile number";
    }
    return errors;
  };

  validateAddress = (values) => {
    const errors = {};
    if (!values.address) {
      errors.address = "Address is required!";
    } else if (!(values.address.length > 3 && values.address.length < 200)) {
      errors.address = "Please provide a valid address!";
    }
    return errors;
  };

  validate = (values) => {
    const errors = {};
    
    errors.user_name = this.validateUserName(values).user_name;
    errors.email = this.validateEmail(values).email;
    errors.gender = this.validateGender(values).gender;
    errors.address = this.validateAddress(values).address;
    errors.contact_number = this.validateContactNumber(values).contact_number;
    console.log(errors);
    return errors;
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.isEditMode ? "Edit contact" : "Add contact"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ui main">
            {/* <h2 className="heading-center">Add contacts to Manager</h2> */}

            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <label htmlFor="user_name">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="user_name"
                  value={this.state.userName}
                  onChange={(e) => {
                    currentUserLength += 1;
                    if (currentUserLength <= e.target.value.length) {
                    
                      this.setState({
                        formErrors: this.validateUserName({
                          user_name: e.target.value,
                        }),
                      });
                    }
                    this.setState({
                      userName: e.target.value,
                    });
                  }}
                  onBlur={(e) =>
                    this.setState({
                      formErrors: this.validateUserName({
                        user_name: e.target.value,
                      }),
                    })
                  }
                />
              </div>

              <p> {this.state.formErrors.user_name} </p>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="Email"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => {
                    currentEmailLength += 1;

                    if (currentEmailLength <= e.target.value.length) {
                      this.setState({
                        formErrors: this.validateEmail({
                          email: e.target.value,
                        }),
                      });
                    }

                    this.setState({
                      email: e.target.value,
                    });
                  }}
                  onBlur={(e) =>
                    this.setState({
                      formErrors: this.validateEmail({
                        email: e.target.value,
                      }),
                    })
                  }
                />
              </div>
              <p>{this.state.formErrors.email} </p>
              <div className="field">
                <label htmlFor="number">Contact</label>
                <input
                  type="tel"
                  placeholder="Enter contact"
                  name="contact_number"
                  value={this.state.contactNumber}
                  onChange={(e) => {
                    currentContactNumberLength += 1;

                    if (currentContactNumberLength <= e.target.value.length) {
                      this.setState({
                        formErrors: this.validateContactNumber({
                          contact_number: e.target.value,
                        }),
                      });
                    }

                    this.setState({
                      contactNumber: e.target.value,
                    });
                  }}
                  onBlur={(e) =>
                    this.setState({
                      formErrors: this.validateContactNumber({
                        contact_number: e.target.value,
                      }),
                    })
                  }
                />
              </div>
              <p>{this.state.formErrors.contact_number} </p>
              <div className="field radioInput">
                <label>Gender</label>
                <div>
                  <label htmlFor="gender">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={this.state.gender === "Male"}
                    onChange={(e) =>
                      this.setState({
                        gender: e.target.value,
                        formErrors: this.validateGender({
                          gender: e.target.value,
                        }),
                      })
                    }
                    onBlur={(e) =>
                      this.setState({
                        formErrors: this.validateGender({
                          gender: e.target.value,
                        }),
                      })
                    }
                  />

                  <label htmlFor="gender">Female</label>
                  <input
                    type="radio"
                    name="gender"
                    checked={this.state.gender === "Female"}
                    value="Female"
                    onChange={(e) =>
                      this.setState({
                        gender: e.target.value,
                        formErrors: this.validateGender({
                          gender: e.target.value,
                        }),
                      })
                    }
                    onBlur={(e) =>
                      this.setState({
                        formErrors: this.validateGender({
                          gender: e.target.value,
                        }),
                      })
                    }
                  />
                </div>
              </div>
              <p>{this.state.formErrors.gender} </p>
              <div className="field">
                <label htmlFor="Address">Address</label>
                <textarea
                  name="address"
                  rows="5"
                  placeholder="Enter Address"
                  value={this.state.address}
                  onChange={(e) => {
                    currentAddressLength += 1;
                    if (currentAddressLength <= e.target.value.length) {
                      // console.log("i m exe");
                      this.setState({
                        formErrors: this.validateAddress({
                          address: e.target.value,
                        }),
                      });
                    }
                    this.setState({
                      address: e.target.value,
                    });
                  }}
                  onBlur={(e) =>
                    this.setState({
                      formErrors: this.validateAddress({
                        address: e.target.value,
                      }),
                    })
                  }
                ></textarea>
              </div>
              <p>{this.state.formErrors.address} </p>
              <button className="ui button blue custom-btn">Save</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
export default MyVerticallyCenteredModal;
