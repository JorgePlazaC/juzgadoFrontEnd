import React from "react";
import { useState, useEffect } from "react";

export const DespliegueDatos = (item) => {

  const [paginaActual, setPaginaActual] = useState(item.paginaAct);
  const [arrayPaginacion, setArrayPaginacion] = useState([])
  const [paginasMax, setPaginasMax] = useState(10)
  const [nuevoArray, setNuevoArray] = useState(item.array)
  const [cargando,setCargando] = useState(true)


  useEffect(() => {
    return () => {
      Paginacion()
    };
  }, [])

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
