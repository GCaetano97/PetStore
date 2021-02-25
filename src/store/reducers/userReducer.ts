import { LOGIN, LOGOUT } from '../actions/userActions';
import { IUserReducer } from '../../types';

interface Action {
    type: string,
    payload: IUserReducer,
}

const initialState: IUserReducer = {
  user: false,
  username: '',
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload.user, username: action.payload.username };
    case LOGOUT:
      return { ...state, user: action.payload.user, username: action.payload.username };
    default:
      return state;
  }
};

export default userReducer;
