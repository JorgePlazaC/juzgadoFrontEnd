import React from "react";
import { useState, useEffect, useContext } from "react";

//Propio del proyecto
import JuzgadoContext from "./JuzgadoContext";

export const DespliegueDatos = (item) => {

  const [arrayPaginacion, setArrayPaginacion] = useState([])
  const [paginasMax, setPaginasMax] = useState(10)
  const [nuevoArray, setNuevoArray] = useState(item.array)
  const [cargando,setCargando] = useState(true)

  //UseContext
  const { paginaActual, setPaginaActual } = useContext(JuzgadoContext)

  useEffect(() => {
    return () => {
      Paginacion()
    };
  }, [paginaActual])

  //Paginación
  const Paginacion = () =>{
    if(paginaActual == 1){
      for (let index = paginaActual-1; index <= paginasMax-1; index++) {
        if(nuevoArray[index] === undefined){
          setCargando(false)
          return
        }
        arrayPaginacion.push(nuevoArray[index])
      }
    } else{
      for (let index = (paginaActual-1)*10; index < (paginasMax*paginaActual); index++) {
        if(nuevoArray[index] === undefined){
          setCargando(false)
          return
        }
        arrayPaginacion.push(nuevoArray[index])
      }
    }
    setCargando(false)
    //console.log(arrayPaginacion)
  }

  //Despliegue
  const Despliegue = () =>{
    if(!cargando){
      return (arrayPaginacion.map((dato, i) => <tbody>
      <tr>
        <td>{dato.nombre}</td>
        <td>{dato.correo}</td>
        <td>{dato.telefono}</td>
        <td>{dato.observaciones}</td>
      </tr>
    </tbody>))
    }
  }

  return (
    Despliegue()
  );
};
