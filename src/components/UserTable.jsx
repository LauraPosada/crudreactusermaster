import React from 'react';  

const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {
            props.users.length > 0 ? (
                props.users.map(user => (
                    <tr key={user.id}>
                        <td>{user.nombre}</td>
                        <td>{user.correo}</td>
                        <td>
                        <button 
                            className="button muted-button"
                            onClick={() => {
                                props.editRow(user)
                            }}
                            >
                            Edit
                        </button>
                        <button 
                            className="button muted-button"
                            onClick={() => props.deleteUser(user.id)}
                            >
                            Delete
                        </button>
                            <input type="checkbox" 
                            onChange={() => props.play(user.id)}
                            />
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No users</td>
                </tr>
            )
        }

      
    </tbody>
  </table>
)

export default UserTable