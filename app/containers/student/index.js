import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker'
import Moment from "moment";
import { connect } from 'react-redux';
import { reduxForm ,reset } from 'redux-form';
import Toast, {DURATION} from 'react-native-easy-toast'
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

//Components
import Header from '../../components/header';
import CustomInput from '../../components/input/input';
import IdentityFields from '../../components/profile';

//Config
import { Colors } from '../../constants';

//Actions
import { addStudents,updateStudent, reSetProfilePicturePath } from '../../reducers/students/actions'

//Icons
import PersonIcon from '../../components/icons/person';
import CalendarIcon from '../../components/icons/calendar';

class Student extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const currentDate = Moment(date).format("DD MMM YYYY");

    this.state = {
      IsPressed: false,
      selectedDate:  this.props.insertRecord ? currentDate : this.props.studentData.dob,
      message: this.props.insertRecord ? 'Record successfully saved' : 'Record successfully updated',
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.reSetProfilePicturePath();
  }

  onSubmit(values) {
    console.log('values:',values);
    console.log('Date of birth:',this.state.selectedDate)

    if(this.state.IsPressed){
      return ;
    }

    if(!this.props.insertRecord) {
      if(this.props.studentData.first === values.first
      && this.props.studentData.last === values.last
      && this.props.studentData.dob === this.state.selectedDate
      && this.props.studentData.hobbies === values.hobbies){
        this.refs.toast_failure.show('Please edit the student record to update', 1000, () => {
        });
      return;
     }
    }

    let updateProfilePath = this.props.insertRecord ? null : this.props.studentData.profilePath
    const path = this.props.students.profilePath ? this.props.students.profilePath : updateProfilePath;

    if(!path) {
        this.refs.toast_failure.show('Please select profile picture', 1000, () => {
      });
      return;
    }

    this.setState({
      IsPressed: true
    });

    if(this.props.insertRecord) {
      let random = Math.random().toString(36).substring(7);

      const request = {
        index: random,
        first: values.first,
        last: values.last,
        dob: this.state.selectedDate,
        profilePath: this.props.students.profilePath,
        hobbies: values.hobbies
      }
      console.log('Request Body Save:',request);

      this.refs.toast_success.show(this.state.message, 500, () => {
          Actions.pop();
         });

      this.props.addStudents(request);
    }else {
      const request = {
        index: this.props.studentData.index,
        first: values.first,
        last: values.last,
        dob: this.state.selectedDate,
        profilePath: this.props.students.profilePath ? this.props.students.profilePath : this.props.studentData.profilePath , //Reading last saved image in save
        hobbies: values.hobbies
      }

      this.refs.toast_success.show(this.state.message, 500, () => {
          Actions.pop();
         });

      console.log('Request Body Update:',request);
      this.props.updateStudent(request);
    }
  }

  goBack(){
    Actions.pop();
  }

  createNavigationBar() {

    const buttonTitle = this.props.insertRecord ? 'SAVE' : 'UPDATE' ;
    return (
      <Header title ={this.props.title}
        titleStyle ={{color:Colors.white}}
        arrowColor = {Colors.white}
        background={Colors.appThemeColor}
        onBackPress={this.goBack}
        onActionPress={this.props.handleSubmit(this.onSubmit)}
        actionButton={(
          <View><Text style={styles.actionButton}>{buttonTitle}</Text></View>
        )}
        />
    );
  }


  render() {
    let updateProfilePath = this.props.insertRecord ? null : this.props.studentData.profilePath
    let updatedPath = this.props.students.profilePath ? this.props.students.profilePath : updateProfilePath;

    return (
      <View style = {styles.container}>
        {this.createNavigationBar()}

        <Toast
           ref="toast_success"
           style={styles.toastSuccesStyle}
           position='top'
           positionValue={71}
           fadeInDuration={750}
           fadeOutDuration={1000}
           textStyle={{color:Colors.black,textAlign:'center',marginTop: 10,fontSize:16,fontWeight: 'bold'}}
         />

         <Toast
            ref="toast_failure"
            style={styles.toastFailureStyle}
            position='top'
            positionValue={71}
            fadeInDuration={750}
            fadeOutDuration={1000}
            textStyle={{color:Colors.white,textAlign:'center',marginTop: 10,fontSize:16,fontWeight: 'bold'}}
          />

        <View style={styles.main}>
          <IdentityFields
          filePath = {updatedPath}/>

              <View style = {styles.calendarMain}>
                <View style = {styles.calendarContainer}>
                  <CalendarIcon fill={Colors.green} width={35} height={35} />
                  <View style = {{backgroundColor:'transparent',height:'80%'}}>
                    <Text style = {{marginLeft:20,marginBottom:10,fontSize:10,color:Colors.cellHeader}}>{'DATE OF BIRTH'}</Text>
                    <DatePicker
                        style = {{marginLeft:20, width:250,backgroundColor:'transparent'}}
                        date={this.state.selectedDate}
                        mode="date"
                        placeholder="DATE OF BIRTH"
                        format="DD MMM YYYY"
                        maxDate = {this.state.selectedDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon = {false}
                        customStyles={{
                           dateInput: {
                             alignItems:'flex-start',
                             borderWidth:0,
                             backgroundColor:'transparent',
                             marginTop:-15,
                           }
                        }}
                        onDateChange={(date) => {
                          this.setState({
                            showCalendar:false,
                            selectedDate:date
                          })
                        }}
                         />
                  </View>
                </View>
                </View>

             <View style = {{marginHorizontal:0,marginTop:10}}>
                  <CustomInput
                    label = {'Hobbies'}
                    placeholder = {'Reading,Playing,Listining....'}
                    name={'Hobbies'.toLowerCase().replace(/\s/g, '')}
                    keyboardType = {'default'}
                    editable = {true}
                    icon = {<PersonIcon fill={Colors.green} width={35} height={35} />}
                    style={styles.nameInput}/>
              </View>

        </View>
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
  nameInput:{
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.16)',
    backgroundColor: 'transparent',
  },
  main: {
    padding: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  calendarContainer:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 65,
    marginLeft:20,
    flexDirection:'row',
  },
  calendarMain: {
    marginTop:10,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.16)',
  },
  actionButton: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: Colors.white
 },
  toastSuccesStyle: {
    backgroundColor: Colors.green,
    width: '100%',
    height: 60
  },
  toastFailureStyle: {
    backgroundColor: Colors.errorColor,
    width: '100%',
    height: 60
  }
});

const StudentRedux = reduxForm({
  form: 'StudentForm'
})(Student);

Student.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  reSetProfilePicturePath: () => dispatch(reSetProfilePicturePath()),
  addStudents:(data) => dispatch(addStudents(data)),
  updateStudent:(data) => dispatch(updateStudent(data))
});

const mapStateToProps = state => ({
  students: state.students,
  initialValues: {
      ...state.students.student
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(StudentRedux);
