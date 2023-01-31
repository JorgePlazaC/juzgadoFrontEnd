import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

export const IngresoDato = () => {
  const [array, setArray] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [validated, setValidated] = useState(false);


  //Actualizar tiempo
  const IngresarDato = (event) => {
    const db = getDatabase();
    let reference = ref(db, "datos/");

    let dato = {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      observaciones: observaciones,
      key: "",
    };

    const response = push(reference, dato);

    dato.key = response.key;
    reference = ref(db, "datos/" + dato.key);
    set(reference, dato);

    console.log("ID obtenida: " + response.key);
    alert("Ingreso exitoso")
    setNombre("")
    setCorreo("")
    setTelefono("")
    setObservaciones("")
    event.preventDefault()
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
    console.log(observaciones);
  };

  const editarObservaciones = (event) => {
    setObservaciones(event.target.value);
    console.log(telefono);
  };


  /*
<form class="row g-3 mt-2 needs-validation" onSubmit={IngresarDato}>
        <div class="col-md-4">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              value={nombre}
              onChange={editarNombre}
              required
            />
            <label for="validationCustom01" class="form-label">
              Nombre
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              value={correo}
              onChange={editarCorreo}
              required
            />
            <label for="validationCustom01" class="form-label">
              Correo
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom02"
              value={telefono}
              onChange={editarTelefono}
              required
            />
            <label for="validationCustom02" class="form-label">
              Telefono
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div className="mx-auto">
          <div class="form-outline">
            <textarea
              class="form-control"
              value={observaciones}
              onChange={editarObservaciones}
              rows={5}
              required
            ></textarea>
            <label for="validationCustom03" class="form-label">
              Observaciones
            </label>
          </div>
        </div>
        <div class="col-12"></div>
        <button class="btn btn-primary submit" type="submit">
          Enviar
        </button>
      </form>
  */

  return (
    <div className="container mt-3">
      <h2>Ingreso de datos</h2>

      <Form validated={validated} onSubmit={IngresarDato}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              value={nombre}
              onChange={editarNombre}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              required
              type="text"
              value={correo}
              onChange={editarCorreo}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              required
              type="text"
              value={telefono}
              onChange={editarTelefono}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="mx-auto">
        <Row className="mx-auto">
          <Form.Group className="mx-auto" as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textArea"
              required
              type="text"
              value={observaciones}
              onChange={editarObservaciones}
              rows={5}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        </div>
        <Button type="submit">Ingresar</Button>
      </Form>
    </div>
  );
};
