import { persistCombineReducers, createTransform } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import storage from 'redux-persist/lib/storage';

// Reducers
import students from './students/reducer';

const sensitiveStorageOptions = {
  sharedPreferencesName: 'mesaic.mesaicDemo',
  keychainService: 'mesaic.mesaicDemo'
};

const userDataBlacklist = createTransform(
  state => {
    const savedState = {
      ...state
    };
    return savedState;
  },
  state => {
    const restoredState = {
      ...state
    };

    return restoredState;
  },
  { whitelist: ['students'] }
);


const storageSettings = {
  key: 'primary',
  storage,
  transforms: [userDataBlacklist],
  blacklist: ['form'] // Remvoe from store when application quites
};

const appReducer = persistCombineReducers(storageSettings, {
  form: formReducer,
  students
});

const rootReducer = (state, action) => {
  const thisState = state;

  if (thisState && thisState._persist == undefined) {
    delete thisState._persist;
  }

  return appReducer(thisState, action);
};

export default rootReducer;
