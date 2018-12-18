import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';

//Component
import Header from '../../components/header';
//Config
import { Colors } from '../../constants';

//Icons

import DeleteIcon from '../../components/icons/delete';

//Actions
import { deleteStudent, selectedStudentData } from '../../reducers/students/actions'

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.updateStudents = this.updateStudents.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.onSwipeOpen = this.onSwipeOpen.bind(this);
    this.onSwipeClose = this.onSwipeClose.bind(this);
  }

  createNavigationBar() {
    return (
      <Header
        title= {this.props.title}
        titleStyle ={{color:Colors.white}}
        arrowColor = {'transparent'}
        background={Colors.appThemeColor}
        onBackPress={this.handleCancel}
        onActionPress={this.navigateStudentScreen}
        actionButton={(
          <View><Text style={styles.actionButton}>ADD</Text></View>
        )}
      />
    );
  }

  onSwipeOpen() {
      if (!this.state.isOpen) {
        this.setState({ isOpen: true });
      }
  }

  onSwipeClose() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  navigateStudentScreen = () => {
    // console.log('navigateStudentScreen');
    Actions.Student({
      title: 'New Student',
      insertRecord: true,
    });
  }

  updateStudents(data) {
    // console.log('updateStudents:',data);
    this.props.selectedStudentData(data);

      Actions.Student({
        title: 'Update Student',
        insertRecord: false,
        studentData: data
      });
  }

  onDeleteButtonHandler(data) {
    // console.log('Delete Record:',data);
    const request = {
      index: data.index
    }
    this.props.deleteStudent(request);
  }

  renderListItem(data) {

    const { first,last,dob,hobbies,profilePath,index } = data.item;

    const swipeoutButtons = [
      {
        component: (
          <View style={styles.callButton}>
            <DeleteIcon fill={Colors.green} width="40" height="40" />
          </View>
        ),
        backgroundColor: 'transparent',
        onPress: this.onDeleteButtonHandler.bind(this, data.item)
      }
    ];

    const source = { uri: profilePath };
    return(
          <View key = {index} style ={{flex:1,marginBottom:10}}>

            <Swipeout
              right={swipeoutButtons}
              buttonWidth={60}
              close={!this.state.isOpen}
              onOpen={this.onSwipeOpen}
              onClose={this.onSwipeClose}
            >
            <TouchableOpacity key = {index} onPress={() => {this.updateStudents(data.item)}}>

            <View style = {styles.cellContainer}>
              <View style = {styles.profilePictureContainer}>
                  <Image source={ source } style={styles.profileImage} />
              </View>

              <View style = {styles.studentContent}>
                <Text style = {styles.studentNames}>{first} {last}</Text>
                <Text>{dob}</Text>
                <Text style = {styles.hobbiesStyle}>{hobbies}</Text>
              </View>

            </View>
            </TouchableOpacity>

          </Swipeout>

        </View>
    );
  }

  render() {

    return (
      <View style = {styles.container}>

        {this.createNavigationBar()}

        {!this.props.students.allStudents.length &&
        <View style = {{marginTop:10}}>
          <Text style = {styles.welcome}>No records</Text>
        </View>
      }

      <FlatList
        data={this.props.students.allStudents}
        keyExtractor={item => item.index}
        renderItem={this.renderListItem}
        style={styles.listView}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={6}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.white,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: Colors.appThemeColor
  },
  listView: {
    flex: 1,
    flexGrow: 1,
    position: 'relative',
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  cellContainer: {
    flex:1,
    flexDirection: 'row',
    backgroundColor:Colors.cellColor,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 4
  },
  profilePictureContainer: {
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  studentContent: {
    justifyContent:'center',
    flex:1,
    marginHorizontal:5,
    marginVertical:5,
    backgroundColor:'transparent'
  },
  studentNames: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  hobbiesStyle: {
    fontSize: 14,
    marginTop: 5
  },
  actionButton: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: Colors.white,
  },
  callButton: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    color: Colors.white,
    fontSize: 18
  }
});

const mapDispatchToProps = dispatch => ({
  selectedStudentData:(data) => dispatch(selectedStudentData(data)),
  deleteStudent:(data) => dispatch(deleteStudent(data))
});

const mapStateToProps = state => ({
  students: state.students,
});

export default connect(mapStateToProps,mapDispatchToProps)(Students);
