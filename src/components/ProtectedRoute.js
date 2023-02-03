import React, { Component, useContext } from 'react'
import { Route, Navigate, useLocation } from 'react-router-dom'
import JuzgadoContext from './JuzgadoContext'

const ProtectedRoute = ({children,nombreRuta}) => {
    //const { usuario, setUsuario } = useContext(JuzgadoContext);
    console.log('Ruta: '+nombreRuta)
    console.log(JSON.stringify(nombreRuta))
    const uID = localStorage.getItem('usuario')
    let location = useLocation();

    if(!uID) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;