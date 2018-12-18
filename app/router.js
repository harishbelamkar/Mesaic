import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';


//Containers:

import Students from './containers/students';
import Student from './containers/student';

class RootRouter extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (Actions.currentScene === 'Students') {
        BackHandler.exitApp();
      }
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Router>
        <Scene key="root" initial hideNavBar>
          <Scene key="Students" component={Students} title="Students" initial={true}/>
          <Scene key="Student" component={Student} title="Student"/>
        </Scene>
      </Router>
    );
  }
}

export default RootRouter;
