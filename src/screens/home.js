import React from "react";
import { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  remove,
} from "firebase/database";
import { Table, Button, Modal, Col, Form, InputGroup, Row } from "react-bootstrap";


//Propio del proyecto
import JuzgadoContext from "../components/JuzgadoContext";
import { DespliegueDatos } from "../components/DespliegueDatos";

export const Home = () => {
  const [array, setArray] = useState([]);
  const [arrayTodo, setArrayTodo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paginasMax, setPaginasMax] = useState(10);
  const [pagActual, setPagActual] = useState(1);
  const [arrayPaginacion, setArrayPaginacion] = useState([]);
  const [siguienteDisponible, setSiguienteDisponible] = useState(true);
  const [anteriorDisponible, setAnteriorDisponible] = useState(false);
  const [inputBuscar, setInputBuscar] = useState();
  const [modal, setModal] = useState(false);
  const [modalEdicion, setModalEdicion] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observacion, setObservacion] = useState("");
  const [key, setKey] = useState("");

  let arraySeleccion = [];

  //UseContext
  const { paginaActual, setPaginaActual, iniciado, setIniciado } =
    useContext(JuzgadoContext);

  //UseEfect
  useEffect(() => {
    (() => {
      fetchFirebase();
    })();
  }, [pagActual]);

  //Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCYw_a9MBVt8CrfLGJQoBgtmU_o2a0pUF4",
    authDomain: "juzgado-bc929.firebaseapp.com",
    databaseURL: "https://juzgado-bc929-default-rtdb.firebaseio.com",
    projectId: "juzgado-bc929",
    storageBucket: "juzgado-bc929.appspot.com",
    messagingSenderId: "870031317689",
    appId: "1:870031317689:web:1ae41009cf440ebb4f9968",
    measurementId: "G-PSKV396MB4",
  };

  const app = initializeApp(firebaseConfig);

  //Objeto
  let dato = {
    apellido: String,
    ciudad: String,
    nombre: String,
  };

  //Obtener datos
  const fetchFirebase = () => {
    try {
      const db = getDatabase();
    const reference = ref(db, "datos/");
    onValue(reference, (snapshot) => {
      const data = [];
      let cont = 0;
      if (arraySeleccion.length >= 1) {
        arraySeleccion = [];
      }
      snapshot.forEach((dato) => {
        arraySeleccion.push(dato.val());
        if (
          (pagActual - 1) * paginasMax <= cont &&
          pagActual * paginasMax > cont
        ) {
          const valor = dato.val();

          data.push(valor);
        }
        //console.log(cont)
        cont++;
      });
      console.log(arraySeleccion);
      setArrayTodo(arraySeleccion);
      setArray(data);
      //Paginacion()
      setCargando(false);
    });
    } catch (error) {
      alert(error)
    }
  };

  //Anterior página
  const AnteriorPagina = () => {
    let suma = pagActual - 1;
    //console.log(suma);
    setPagActual(suma);
    fetchFirebase();

    //Paginacion();
    //console.log(suma);
    if (arraySeleccion.length < 9) {
      setSiguienteDisponible(false);
    } else {
      setSiguienteDisponible(true);
    }
    if (suma === 1) {
      setAnteriorDisponible(false);
    } else {
      setAnteriorDisponible(true);
    }
  };

  //Siguiente página
  const SiguientePagina = () => {
    let suma = pagActual + 1;
    //console.log(suma);
    setPagActual(suma);
    fetchFirebase();
    //Paginacion();
    //console.log(suma);
    let totalPaginas = arraySeleccion.length / 10;
    console.log("Suma: " + suma);
    console.log("El total de paginas es: " + totalPaginas);

    if (suma >= totalPaginas) {
      setSiguienteDisponible(false);
    } else {
      setSiguienteDisponible(true);
    }
    if (suma === 1) {
      setAnteriorDisponible(false);
    } else {
      setAnteriorDisponible(true);
    }
  };

  const Busqueda = (event) => {
    let arrayBusqueda = [];
    //console.log(arrayTodo)
    arrayTodo.forEach((dato, i) => {
      if (dato.nombre === inputBuscar) {
        arrayBusqueda.push(dato);
      }
    });
    setArray(arrayBusqueda);
    console.log(array);
    //setPagActual(1)
    event.preventDefault();
  };

  const BorrarDato = (dato) => {
    try {
      const db = getDatabase();
    let reference = ref(db, "datos/");
    console.log("Borrar");
    reference = ref(db, "datos/" + dato.key);
    if(window.confirm("Estás seguro que deseas eliminar "+dato.nombre)){
      remove(reference, dato)
      .then(alert("Eliminación exitosa de: " + dato.nombre))
      .catch((error) => {
        alert(error);
      });
      return
    }
    alert("Eliminación cancelada")
    } catch (error) {
      alert(error)
    }
  };

  const ModificarDato = (event) => {
    try {
      const db = getDatabase();
    let reference = ref(db, "datos/");

    let dato = {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      observaciones: observacion,
      key: key,
    };

    reference = ref(db, "datos/" + dato.key);
    set(reference, dato);

    alert("Modificación exitosa")
    setModalEdicion(false)
    event.preventDefault()
    } catch (error) {
      alert(error)
    }
  };

  /*
  //Paginación
  const Paginacion = () => {
    console.log("Paginación");
    console.log("Página: " + pagActual);
    //console.log(arrayPaginacion);
    //console.log("Iniciado: " + iniciado);
    console.log("Array normal");
    console.log(array)

    if (array.length === 0) {
      console.log("Array vacío");
    }

    let arraySlice = [];
    arraySlice = array;
    arraySlice = arraySlice.slice((pagActual - 1) * 10, paginasMax * pagActual);
    //arraySlice = arraySlice.slice(0,10)
    arraySeleccion = arraySlice;
    setArrayPaginacion(arraySlice);
    
    if (arrayPaginacion.length < 9) {
      setSiguienteDisponible(false);
    } else {
      setSiguienteDisponible(true);
    }
    if (pagActual === 1) {
      setAnteriorDisponible(false);
    } else {
      setAnteriorDisponible(true);
    }

    console.log(arraySlice);
  };
  */

  //Listar datos
  const DesplegarDatos = () => (
    <div>
      <Table className="container shadow-lg" striped>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {array.map((dato, i) => (
          <tbody>
            <tr>
              <td>{dato.nombre}</td>
              <td>{dato.correo}</td>
              <td>{dato.telefono}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShow();
                    setObservacion(dato.observaciones);
                  }}
                >
                  Abrir
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShowEdicion();
                    setNombre(dato.nombre);
                    setCorreo(dato.correo)
                    setTelefono(dato.telefono)
                    setObservacion(dato.observaciones)
                    setKey(dato.key)
                    console.log(dato.observaciones)
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    BorrarDato(dato);
                  }}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {anteriorDisponible ? (
        <Button onClick={AnteriorPagina} disabled={false}>
          Anterior
        </Button>
      ) : (
        <Button onClick={AnteriorPagina} disabled={true}>
          Anterior
        </Button>
      )}
      {siguienteDisponible ? (
        <Button onClick={SiguientePagina} disabled={false}>
          Siguiente
        </Button>
      ) : (
        <Button onClick={SiguientePagina} disabled={true}>
          Siguiente
        </Button>
      )}
    </div>
  );

  /*
  const SeleccionArray = () => {
    if (arrayPaginacion.length === 0) {
      console.log("Array seleccion:");
      console.log(arraySeleccion);
      console.log("Array normal:");
      console.log(array);
      Paginacion();
      return arraySeleccion.map((dato, i) => (
        <tbody>
          <tr>
            <td>{dato.nombre}</td>
            <td>{dato.correo}</td>
            <td>{dato.telefono}</td>
            <td>{dato.observaciones}</td>
          </tr>
        </tbody>
      ));
    } else {
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
  */

  const editarInputBusqueda = (event) => {
    setInputBuscar(event.target.value);
    console.log(inputBuscar);
  };

  const handleClose = () => setModal(false);
  const handleShow = (observacion) => {
    console.log(observacion);
    setObservacion(observacion);
    setModal(true);
  };
  const handleCloseEdicion = () => setModalEdicion(false);
  const handleShowEdicion = () => {
    setModalEdicion(true);
  };

  const editarNombre = (event) => {
    setNombre(event.target.value);
    console.log(nombre);
  };

  const editarCorreo = (event) => {
    setCorreo(event.target.value);
    console.log(correo);
  };

  const editarTelefono = (event) => {
    setTelefono(event.target.value);
    console.log(telefono);
  };

  const editarObservaciones = (event) => {
    setObservacion(event.target.value);
    console.log(observacion);
  };
  return (
    <div className="mt-3 container">
      <form class="form-inline my-2 my-lg-0" onSubmit={Busqueda}>
        <input
          class="form-control mr-sm-2"
          type="text"
          aria-label="Search"
          required
          value={inputBuscar}
          onChange={editarInputBusqueda}
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Buscar
        </button>
      </form>
      <div class="container">{DesplegarDatos()}</div>
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Observaciones:</Modal.Title>
        </Modal.Header>
        <Modal.Body>{observacion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalEdicion} onHide={handleCloseEdicion}>
        <Modal.Header closeButton>
          <Modal.Title>Edición de datos:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={ModificarDato}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control required type="text" value={nombre} onChange={editarNombre} />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Correo</Form.Label>
                <Form.Control required type="text" value={correo} onChange={editarCorreo} />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Telefono</Form.Label>
                <Form.Control required type="text" value={telefono} onChange={editarTelefono} />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="mx-auto">
              <Row className="mx-auto">
                <Form.Group
                  className="mx-auto"
                  as={Col}
                  md="4"
                  controlId="validationCustom04"
                >
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control
                    size="lg"
                    required
                    type="text"
                    value={observacion}
                    onChange={editarObservaciones}
                    rows={5}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
            </div>
            <Button type="submit">Ingresar</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdicion}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
