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
          return (
            <>
              <div className="item container">
                <div className="content-class">
                  <div className="custom-content name-container w-20 ">
                    <img className="ui avatar image" src={user} alt="user" />
                    <div className="content">
                      <div>{this.props.userName}</div>
                    </div>
                  </div>
                  <div className="custom-content w-20 ">{this.props.email}</div>
                  <div className="custom-content w-15 ">
                    {this.props.contactNumber}
                  </div>
                  <div className="custom-content w-10 ">
                    {this.props.gender}
                  </div>
                  <div className="custom-content w-25 ">
                    {this.props.address}
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
                      this.props.deleteContactHandler(this.props.id)
                    }
                  ></i>
                </div>
              </div>

              <MyVerticallyCenteredModal
                show={this.state.show}
                onHide={() => this.setState({ show: false })}
                isEditMode={true}
                id={this.props.id}
                userName={this.props.userName}
                email={this.props.email}
                gender={this.props.gender}
                address={this.props.address}
                contactNumber={this.props.contactNumber}
                updateContactHandler={this.props.updateContactHandler}
              />
            </>
          );
    }
}

export default ContactCard;