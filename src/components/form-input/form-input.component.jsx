import React from "react";
import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles';

const FormInput = ({ handleChange , label , ...otherprops}) => (
  <div className = "group">
    <input className = "form-input" onChange = {handleChange} {...otherprops} />
    {
      label ?
      (<label className = {`${otherprops.value.length ? "shrink" : ""} form-input-label`}>
        {label}
      </label>)
      : null
}
    </div>
);

export default FormInput;
