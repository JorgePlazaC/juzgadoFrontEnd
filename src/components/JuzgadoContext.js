import { createContext, useState, useEffect } from "react";

const JuzgadoContext = createContext();

export function JuzgadoProvider({ children }) {
  const [usuario, setUsuario] = useState();

  return (
    <JuzgadoContext.Provider
      value={{
        usuario, setUsuario
      }}
    >
      {children}
    </JuzgadoContext.Provider>
  );
}

export default JuzgadoContext;
