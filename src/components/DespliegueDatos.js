import React from "react";
import { useState, useEffect, useContext } from "react";

//Propio del proyecto
import JuzgadoContext from "./JuzgadoContext";

export const DespliegueDatos = (item) => {
  const [arrayPaginacion, setArrayPaginacion] = useState([]);
  const [paginasMax, setPaginasMax] = useState(10);
  const [nuevoArray, setNuevoArray] = useState(item.array);
  const [cargando, setCargando] = useState(true);

  //UseContext
  const { paginaActual, setPaginaActual } = useContext(JuzgadoContext);

  useEffect(() => {
    return () => {
      Paginacion();
    };
  }, [paginaActual]);

  //Paginación
  const Paginacion = () => {
    setCargando(true);
    let arraySlice = []
    arraySlice = nuevoArray
    arraySlice = arraySlice.slice((paginaActual-1)*10,paginasMax*paginaActual)
    //arraySlice = arraySlice.slice(0,10)
    setArrayPaginacion(arraySlice)

    setCargando(false);
    console.log(arraySlice)
  };
  //Despliegue
  const Despliegue = () => {
    if (!cargando) {
      return arrayPaginacion.map((dato, i) => (
        <tbody>
          <tr>
            <td>{dato.nombre}</td>
            <td>{dato.correo}</td>
            <td>{dato.telefono}</td>
            <td>{dato.observaciones}</td>
          </tr>
        </tbody>
      ));
    }
  };

  return Despliegue();
};
