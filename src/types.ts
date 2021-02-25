export interface IPet {
    id: number;
    category: {
      id: number;
      name: string;
    };
    name: string;
    photoUrls: string[];
    tags: [
      {
        id: number;
        name: string;
      },
    ];
    status: string;
  }

export interface IState {
  notificationReducer: INotificationReducer,
  petReducer: IPetReducer,
  userReducer: IUserReducer,
}

export interface INotificationReducer {
  modal: boolean,
  modalMessage: string,
}

export interface IPetReducer {
  filter: string,
}

export interface IUserReducer {
  user: boolean,
  username: string,
}
