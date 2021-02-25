import { CHANGE_FILTER } from '../actions/petActions';
import { IPetReducer } from '../../types';

interface Action {
    type: string,
    payload: IPetReducer
}

const initialState: IPetReducer = {
  filter: 'available',
};

const petReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, filter: action.payload.filter };
    default:
      return state;
  }
};

export default petReducer;
