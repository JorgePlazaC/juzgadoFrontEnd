import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from 'react';

//Del proyecto
import JuzgadoContext from '../components/JuzgadoContext';

export const InicioSesion = () => {
  //UseContext
  const { usuario, setUsuario } = useContext(JuzgadoContext);


  const IniciarSesion = async (event) => {
    console.log(event)
    //console.log(event.target.elements.email.value)
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    event.preventDefault();

    let email = event.target[0].value
    let contrasenia = event.target[1].value
    
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        // Signed in 
        console.log("UserCedentials: "+ userCredential)
        console.log(userCredential)
        const user = userCredential.user;
        console.log("Usuario: "+ user)
        console.log(user)
        setUsuario(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ..
      });
      
  }

return (
  <div className="justify-content-md-centermt-3 container w-25">
    <Card>
      <Card.Header as="h5">Inicio sesión</Card.Header>
      <Card.Body>
        <Form onSubmit={IniciarSesion}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com"  />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              controlId="floatingInput"
              label="Contraseña"
              className="mb-3"
            >
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);
};
