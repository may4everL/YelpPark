import React from "react";
import Form from "./form";
import Axios from "axios";

class NewPark extends Form {
  onSubmit = async event => {
    event.preventDefault();
    try {
      const { park, URL, description } = this.state.data;
      if (park && URL) {
        const data = {
          name: park,
          url: URL,
          description: description
        };
        Axios.post("/parks", data).then(({ status }) => {
          if (parseInt(status) === 200) {
            this.props.history.push("/parks");
          }
        });
      }
    } catch (err) {
      alert("Sorry there was some error in creating the park");
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <p className="lead text-white bg-dark d-inline-block">
              Implement Disable button logic. Error logic on Submit page,
              Separate onSubmit function to Form
            </p>
            <h2 className="my-3">Submit a park</h2>
            <form onSubmit={this.onSubmit} method="post">
              {this.getInputField("park name", "park")}
              {this.getInputField("Image URL", "URL")}
              {this.getTextArea("Enter description", "description")}
              {this.renderButton("Submit")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Newpark;