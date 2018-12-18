
export const MESAIC_ADD_STUDENT = 'MESAIC_ADD_STUDENT';
export const MESAIC_UPDATE_STUDENT = 'MESAIC_UPDATE_STUDENT';
export const MESAIC_DELETE_STUDENT = 'MESAIC_DELETE_STUDENT';

export const MESAIC_SET_PROFILE_PICTURE_PATH = 'MESAIC_SET_PROFILE_PICTURE_PATH';
export const MESAIC_RESET_PROFILE_PICTURE_PATH = 'MESAIC_RESET_PROFILE_PICTURE_PATH';

export const MESAIC_SET_SELECTED_STUDENT_DATA = 'MESAIC_SET_SELECTED_STUDENT_DATA';

export const add = (data) => ({
  type: 'MESAIC_ADD_STUDENT',
  payload: data
});

export const update = (data) => ({
  type: 'MESAIC_UPDATE_STUDENT',
  payload: data
});

export const deleteRecord = (data) => ({
  type: 'MESAIC_DELETE_STUDENT',
  payload: data
});

export const setProfilePicturePath = (data) => ({
  type: 'MESAIC_SET_PROFILE_PICTURE_PATH',
  payload: data
});

export const reSetProfilePicturePath = () => ({
  type: 'MESAIC_RESET_PROFILE_PICTURE_PATH',
  payload: null
});

export const selectedStudentData = (data) => ({
  type: 'MESAIC_SET_SELECTED_STUDENT_DATA',
  payload: data
});


// Add student into Redux:
export const addStudents = (param) => (dispatch, getState) => {
  const state = getState();
  const students = state.students.allStudents;
  let tempArray = [];
  tempArray.push(param);
  tempArray = [...tempArray, ...students];
  return dispatch(add(tempArray));
};

// Update student into Redux:
export const updateStudent = (param) => (dispatch, getState) => {
  const state = getState();
  const students = state.students.allStudents;
  const tempArray = [];

  for (let i = 0; i < students.length; i++) {
    if (param.index === students[i].index) {
      tempArray.push(param);
    } else {
      tempArray.push(students[i]);
    }
  }
  return dispatch(update(tempArray));
};

// Delete student from Redux:
export const deleteStudent = (param) => (dispatch, getState) => {
  const state = getState();
  const students = state.students.allStudents;
  const tempArray = [];

  for (let i = 0; i < students.length; i++) {
    if (param.index === students[i].index) {
      continue;
    } else {
      tempArray.push(students[i]);
    }
  }
  return dispatch(deleteRecord(tempArray));
};
