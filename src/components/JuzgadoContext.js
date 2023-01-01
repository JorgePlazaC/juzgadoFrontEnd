import { createContext, useState, useEffect } from "react";

const JuzgadoContext = createContext();

export function JuzgadoProvider({ children }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [iniciado, setIniciado] = useState();

  return (
    <JuzgadoContext.Provider
      value={{
        paginaActual, setPaginaActual, iniciado, setIniciado
      }}
    >
      {children}
    </JuzgadoContext.Provider>
  );
}

export default JuzgadoContext;
