import React, { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode
}

const Context = createContext({});

function Provider({ children } : Props) {
  const initialState = {
    user: false,
    username: '',
    filter: 'available',
    pets: undefined,
    modal: false,
    modalMessage: '',
  };
  const [state, updateState] = useState(initialState);

  function update(
    newState: React.SetStateAction<{
      user: boolean;
      username: string;
      filter: string;
      pets: undefined;
      modal: boolean;
      modalMessage: string;
    }>,
  ) {
    updateState(newState);
  }

  return (
    <Context.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const { Consumer } = Context;

export { Provider, Consumer, Context };
