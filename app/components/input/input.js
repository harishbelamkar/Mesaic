import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import Person from '../icons/person';
import { required } from '../../validation';

const CustomInput = props => (
  <Field
    label = {props.label}
    style = {props.style}
    name = {props.name}
    editable = {props.editable}
    placeholder = {props.placeholder}
    autoCapitalize = "none"
    validate = {[required]}
    keyboardType = {props.keyboardType}
    icon={props.icon}
    component={Input}
  />
);

CustomInput.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.object.isRequired
};

CustomInput.defaultProps = {
  editable: true
};
export default CustomInput;
