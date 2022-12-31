import React from "react";

export const DespliegueDatos = (item) => {
  console.log(item.item);
  return (
    <tbody>
      <tr>
        <td>{item.item.nombre}</td>
        <td>{item.item.correo}</td>
        <td>{item.item.telefono}</td>
        <td>{item.item.observaciones}</td>
      </tr>
    </tbody>
  );
};
