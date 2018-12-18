import {
  MESAIC_ADD_STUDENT,
  MESAIC_UPDATE_STUDENT,
  MESAIC_DELETE_STUDENT,
  MESAIC_SET_PROFILE_PICTURE_PATH,
  MESAIC_SET_SELECTED_STUDENT_DATA,
  MESAIC_RESET_PROFILE_PICTURE_PATH
} from './actions';


const initState = {
  allStudents: [],
  students: undefined,
  profilePath: undefined,
  student: undefined
};

export default function reducer(state = initState, actions) {
  switch (actions.type) {
    case MESAIC_ADD_STUDENT:
    case MESAIC_UPDATE_STUDENT:
    case MESAIC_DELETE_STUDENT:
      return {
        ...state,
        allStudents: actions.payload
      };

    case MESAIC_SET_PROFILE_PICTURE_PATH:
      return {
        ...state,
        profilePath: actions.payload
      };

    case MESAIC_SET_SELECTED_STUDENT_DATA:
      return {
        ...state,
        student: actions.payload
      };

    case MESAIC_RESET_PROFILE_PICTURE_PATH:
      return {
        ...state,
        profilePath: undefined,
        student: undefined
      };

    default:
      return state;
  }
}
