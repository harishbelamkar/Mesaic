import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import { Field } from 'redux-form';
import ProfilePicture from '../../components/profile-picture';
import InlineInput from '../../components/input/inline';
import { required } from '../../validation';

const styles = StyleSheet.create({
  personInfo: {
    backgroundColor: 'white',
    height:  126,
    // shadowColor: 'rgba(0, 0, 0, 0.16)',
    // shadowOffset: {
    //   width: 0,
    //   height: 0.5
    // },
    // shadowRadius: 1.5,
    // shadowOpacity: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.16)',
  },
  border: {
    marginLeft: 10,
    marginRight: -10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)'
  },
  inputs: {
    flex: 6,
  }
});

class IdentityFields extends Component {

  render() {
    return (
      <View style={styles.personInfo}>
        {this.props.filePath
          ? (
            <ProfilePicture
              source={{ uri: this.props.filePath }}
            />
          ) : (
            <ProfilePicture/>
          )}
        <View style={styles.inputs}>
          <Field
            label=""
            name="first"
            component={InlineInput}
            validate = {[required]}
            placeholder= "First Name"

          />
          <View style={styles.border} />
          <Field
            label=""
            name="last"
            validate = {[required]}
            component={InlineInput}
            placeholder= "Last Name"
         />
        </View>
      </View>
    );
  }
}

export default IdentityFields;
