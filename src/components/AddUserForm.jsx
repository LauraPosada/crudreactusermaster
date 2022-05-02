import React from 'react';
import { useForm } from 'react-hook-form'

const AddUserForm = (props) => {

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        data.id = null
        console.log('datos en el crear');
        console.log(data)  

        var datosEnviar = {
            nombre: data.name,
            correo: data.username
        } 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar)
        };
        fetch('http://localhost/empleados/?insertar=1', requestOptions)
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
            // props.addUser(data)
            e.target.reset();


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input 
                type="text" 
                name="name"
                ref={register({required: {value: true, message: 'Valor requerido'}})}
                />
            <div>
                {errors?.name?.message}
            </div>
            <label>Username</label>
            <input 
                type="text" 
                name="username" 
                ref={register({required: {value: true, message: 'Valor requerido'}})}
                />
            <div>
                {errors?.username?.message}
            </div>
            <button type="submit">Add new user</button>
        </form>
    );
}
 
export default AddUserForm;