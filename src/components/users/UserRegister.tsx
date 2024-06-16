import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, getUser, updateUser } from '../../services/userService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { User } from '../../shared/User';

const UserRegister: React.FC = () => {
    const [error, setError]   = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [user, setUser]     = useState<User>({} as User);
    const { id }              = useParams<{ id: string }>();
    const navigate            = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await getUser(Number(id));
                    setUser({
                        ...response.data,
                        password: "",
                        confirmPassword: ""
                    });
                } catch {
                    alert("Error al obtener datos del usuario");
                }
            };

            fetchUser();
        }
    }, [id]);

    const handleChanges = (e: ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError('');
        
        if (name === 'password' || name === 'confirmPassword') {
            if (name === 'confirmPassword' && user.password !== value) {
                setError('Las contraseñas no coinciden');
            } else if (name === 'password' && user.confirmPassword !== value) {
                setError('Las contraseñas no coinciden');
            }
        }

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(error === "") {
            if (id) {
                await updateUser(Number(id), user);
            } else {
                await createUser(user);
            }

            navigate('/users');
        } else {
            alert(error);
        }
    };

    return (
        <div>
            <h2 className='text-start'>{isEdit ? 'Editar' : 'Nuevo'} Usuario</h2>
            <Form onSubmit={handleSubmit}>
                <div className='row mb-5'>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Ingrese el nombre" value={user.name || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="lastname">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Ingrese el apellidos" value={user.lastName || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Ingrese el email" value={user.email || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Ingrese el password" value={user.password} onChange={handlePasswordChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control name="confirmPassword" type="password" placeholder="Confirme el password" value={user.confirmPassword} onChange={handlePasswordChanges}/>
                    </Form.Group>
                </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <Button variant="secondary" onClick={() => navigate('/users')}>Cancelar</Button>
                        <Button variant="primary" type="submit" className='ms-2'>Guardar</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default UserRegister;
