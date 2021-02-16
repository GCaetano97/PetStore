import React, { createContext, useState } from "react";

let Context = createContext("");

function Provider({ children }: any) {
  const initialState = {
    user: false,
    username: "",
    filter: "available",
    pets: undefined,
    modal: false,
    modalMessage: "",
  };

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

  const [state, updateState] = useState(initialState);

  return (
    <Context.Provider
      value={{
        state: state,
        update: update,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const Consumer = Context.Consumer;

export { Provider, Consumer, Context };
