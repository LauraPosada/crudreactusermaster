import React from 'react'
import { useForm } from 'react-hook-form'

const EditYo = (props) => {

    const {register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentUser
    });

    setValue('name', props.currentUser.nombre)
    setValue('username', props.currentUser.correo)

    const onSubmit = (data, e) => {
        data.id = props.currentUser.id
        data.nombre = props.currentUser.name
        data.correo = props.currentUser.username
        console.log('datos en edit yo');
        console.log(data)

        props.updateUser(props.currentUser.id, data)
        e.target.reset()
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
            <button type="submit">Edit user</button>
            <button onClick={() => props.setEditing(false)} className="button muted-button">
                Cancel
            </button>
        </form>
    );
}
 
export default EditYo;