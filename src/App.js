import React, { useState } from 'react'; 
import { useEffect } from 'react';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditYo from './components/EditYo';
import { NavLink } from 'react-router-dom';
import Juego from './components/Juego';
import {
  BrowserRouter,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import ModalView from './components/ModalView';
// import { v4 as uuidv4 } from 'uuid';

function App() {

  const [users, setUsers] = useState([]); 
  const [checked, setChecked] = useState(false);
  // const [usersplay, setUsersPlay] = useState([]);



  useEffect(() => {
    fetch('http://localhost/empleados/')
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        setUsers(users)
      })
  }, [])

  //Agregar Usuario
  const addUser = (user) => {
    console.log(user)
    setUsers([
      ...users,
      user
    ])
  }

  // Eliminar usuario
  const deleteUser = id => {
    console.log(id);
    console.log(users);
    // setUsers(users.filter(user => user.id !== id))
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost/empleados/?borrar=' + id, requestOptions)
      .then(response => response.json())
      .then(
        (users) => {

        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    setUsers(users.filter(user => user.id !== id))
  }

  // Editar usuario
  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, nombre: '', correo: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  //obtener valores a editar de la fila de usuarios
  const editRow = user => {
    setEditing(true)
    console.log(user);
    setCurrentUser({ id: user.id, name: user.nombre, username: user.correo })
  }

  //editar usuario
  const updateUser = (id, updatedUser) => {
    var datosEnviar = {
      id: updatedUser.id,
      nombre: updatedUser.name,
      correo: updatedUser.username
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosEnviar)
    };
    fetch('http://localhost/empleados/?actualizar=1', requestOptions)
      .then(response => response.json())
      .then(
        (datosCargados) => {

          console.log(datosCargados);
          // window.location.href = "/"
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    setEditing(false)
    updatedUser.correo = updatedUser.username
    updatedUser.nombre = updatedUser.name
    console.log(updatedUser);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }
 
  //enviar usuarios a juego
  const play = (id, check) => {
    console.log(id);
    console.log(check);
    return(
      <ModalView>

      </ModalView>
    );
    // setUsersPlay(id); 

    // setUsersPlay([
    //   ...usersplay,
    //   id
    // ])


  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit User</h2>
              <EditYo
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} play={play} />
        </div>

        <div>

          <BrowserRouter>
            <div>
              <h2>IR AL JUEGO</h2>
              <NavLink to={"/juego"} >
                <button>JUGAR</button>
              </NavLink>
            </div>

            <Routes>
              <Route path="/juego" element={<Juego />}></Route>
            </Routes>

          </BrowserRouter>
        </div> 

      </div>
    </div>
  );
}

export default App;
