import React,{Component} from "react";
import user from "../images/user.png";
import MyVerticallyCenteredModal from "./Modal";



class ContactCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show : this.props.show,
           
        }
    }



    editHandler = () => {
      this.setState({show : true})  
    }

    render() {
      const {id,userName,email,gender,address,contactNumber,updateContactHandler,deleteContactHandler} = this.props;

          return (
            <>
              <div className="item container">
                <div className="content-class">
                  <div className="custom-content name-container w-20 ">
                    <img className="ui avatar image" src={user} alt="user" />
                    <div className="content">
                      <div>{userName}</div>
                    </div>
                  </div>
                  <div className="custom-content w-20 ">{email}</div>
                  <div className="custom-content w-15 ">
                    {contactNumber}
                  </div>
                  <div className="custom-content w-10 ">
                   {gender}
                  </div>
                  <div className="custom-content w-25 ">
                    {address}
                  </div>
                </div>
                <div className="custom-content editable-class ">
                  <i
                    className="edit alternate outline icon"
                    onClick={this.editHandler}
                  ></i>
                  <i
                    className="trash alternate outline icon"
                    onClick={() =>
                      deleteContactHandler(id)
                    }
                  ></i>
                </div>
              </div>

              <MyVerticallyCenteredModal
                show={this.state.show}
                onHide={() => this.setState({ show: false })}
                isEditMode={true}
                id={id}
                userName={userName}
                email={email}
                gender={gender}
                address={address}
                contactNumber={contactNumber}
                updateContactHandler={updateContactHandler}
              />
            </>
          );
    }
}

export default ContactCard;