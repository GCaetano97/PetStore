import { DISPLAY, DISPLAY_NONE } from '../actions/notificationActions';
import { INotificationReducer } from '../../types';

interface Action {
    type: string,
    payload: INotificationReducer
}

const initialState: INotificationReducer = {
  modal: false,
  modalMessage: '',
};

const notificationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case DISPLAY:
      return { ...state, modal: action.payload.modal, modalMessage: action.payload.modalMessage };
    case DISPLAY_NONE:
      return { ...state, modal: action.payload.modal, modalMessage: action.payload.modalMessage };
    default:
      return state;
  }
};

export default notificationReducer;
