import React from "react";

export const DespliegueDatos = (item) => {
  console.log(item.item);
  return (
    <button type="button" class="list-group-item list-group-item-action">
      {item.item.nombre}
    </button>
  );
};
