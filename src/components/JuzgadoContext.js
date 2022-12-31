import { createContext, useState, useEffect } from "react";

const JuzgadoContext = createContext();

export function JuzgadoProvider({ children }) {
  const [paginaActual, setPaginaActual] = useState();

  return (
    <JuzgadoContext.Provider
      value={{
        paginaActual, setPaginaActual,
      }}
    >
      {children}
    </JuzgadoContext.Provider>
  );
}

export default JuzgadoContext;
