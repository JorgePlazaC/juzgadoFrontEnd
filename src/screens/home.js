import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

export const home = () => {
  const [array, setArray] = useState([]);

  //UseEfect
  useEffect(() => {
    (async () => {
      fetchFirebase();
    })();
  }, []);

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

  //Obtener tiempo
  const fetchFirebase = () => {
    const db = getDatabase();
    const reference = ref(db, "datos/");
    onValue(reference, async (snapshot) => {
      const data = await snapshot.val();
      setArray(data);
    });
    console.log("asdasdasdasd");
  };
  return <div>home</div>;
};
