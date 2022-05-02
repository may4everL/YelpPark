import React, { Component } from "react";
import Input from "./inputField";
import TextArea from "./textArea";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateInputField = ({ name, value }) => {
    value = value ? value.trim() : value;
    if (!value) {
      return name + " can't be empty";
    }
  };

  validate = () => {};
  handleChange = ({ currentTarget: input }) => {
    const error = { ...this.state.errors };
    const err = this.validateInputField(input);
    if (error) {
      error[input.name] = err;
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ errors: error, data });
  };
  getInputField = (placeholder, name, type = "text") => {
    return (
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={this.handleChange}
        value={this.state.data[name] ? this.state.data[name] : ""}
        errors={this.state.errors[name]}
      />
    );
  };

  getTextArea = (placeholder, name) => {
    return (
      <TextArea
        placeholder={placeholder}
        name={name}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = label => {
    return <button className="btn btn-primary">{label}</button>;
  };
}

export default Form;