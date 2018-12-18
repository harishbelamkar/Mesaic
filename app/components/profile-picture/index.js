import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { Colors } from '../../constants';
import { setProfilePicturePath } from '../../reducers/students/actions'
const pictureSize = 80;

const styles = StyleSheet.create({
  photo: {
    flex: 3,
    width: pictureSize,
    height: pictureSize
  },
  image: {
    width: pictureSize,
    height: pictureSize,
    borderRadius: 4
  },
  textStyle: {
    marginTop: 3,
    marginLeft: 7,
    fontSize: 10,
    color: Colors.black
  }
});

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.selectPicture = this.selectPicture.bind(this);

    this.state = {
      source: this.props.source
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      source: nextProps.source
    });
  }

  selectPicture() {
    console.log('selectPicture:')
    const options = {
      title: 'Select Profile Picture',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      mediaType: 'photo',
      allowsEditing: true,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.customButton) {
        return;
      }

      if (response.error) {
        return;
      }

      const source = { uri: response.uri };

      this.props.setProfilePicturePath(response.uri);

      this.setState({
        source
      });
      console.log('Pathh:',response.uri);

    });
  }

  renderImage() {
    let result = null;
    if (this.state.source) {
      result =
      <View>
      <Image source={this.state.source} style={styles.image} />
      </View>;
    } else {
      result = (
        <View>
        <Image
          source={require('../../images/select.jpg')}
          style={styles.image}
        />
        </View>
      );
    }
    return result;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.selectPicture}>
        <View style={styles.photo}>
          {this.renderImage()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ProfilePicture.defaultProps = {
  source: null,
};

ProfilePicture.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string
  })
};

const mapDispatchToProps = dispatch => ({
  setProfilePicturePath: (data) => dispatch(setProfilePicturePath(data))
});

const mapStateToProps = state => ({
  students: state.students,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);
