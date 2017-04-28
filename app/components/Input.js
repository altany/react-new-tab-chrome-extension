import React, { PropTypes, Component } from 'react';

export default class Input extends Component {

  static PropTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    
    const { value, onChange, placeholder, name } = this.props;
    
    return (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
}
