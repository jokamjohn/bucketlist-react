import {combineReducers} from 'redux';
import buckets from './bucketsReducer';
import items from './itemsReducer';
import auth from './authReducer';
import passwordReset from './passwordResetReducer';


const rootReducer = combineReducers({
  buckets,
  items,
  auth,
  passwordReset
});

export default rootReducer