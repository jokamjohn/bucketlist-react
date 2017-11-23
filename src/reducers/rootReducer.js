import {combineReducers} from 'redux';
import bucketReducer from './bucketsReducer';
import itemsReducer from './itemsReducer';
import auth from './authReducer';
import passwordResetReducer from './passwordResetReducer';


const rootReducer = combineReducers({
  buckets: bucketReducer,
  items: itemsReducer,
  auth,
  passwordReset: passwordResetReducer
});

export default rootReducer