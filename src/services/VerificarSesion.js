import React from "react";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import JuzgadoContext from "../components/JuzgadoContext";

export const VerificarSesion = (setUsuario) => {
  console.log("Verificando");
  //UseContext
  
  //const { usuario, setUsuario } = useContext(JuzgadoContext);

  //console.log(usuario)

  const emailUsuario = localStorage.getItem('usuario')

  const auth = getAuth();

  if(emailUsuario){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(user.email);
          setUsuario(user);
          console.log("Sesión inciada")
          // ...
        } else {
          // User is signed out
          localStorage.clear()
          console.log("Sesión expirada")
          // ...
        }
        
      });
  }else{
    console.log("No hay sesión iniciada");
  }
  
  
};
