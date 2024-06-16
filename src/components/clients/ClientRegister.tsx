import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { errorClient, newClient, editClient } from '../../features/clients/clientSlice';
import { setAlert } from '../../features/alerts/alertSlice';
import { getById } from '../../services/clientService';
import { AppDispatch, RootState } from '../../app/store';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Client } from '../../shared/Client';
import "react-datepicker/dist/react-datepicker.css";
import isEmptyObject from '../../helpers/ValidateEmptyObject';

interface RouteParams {
    id?: string;
}

const ClientRegister: React.FC = () => {
    const dispatch    = useDispatch<AppDispatch>();
    const clientError = useSelector((state: RootState) => errorClient(state));
    const { id }: RouteParams = useParams();
    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [client, setClient] = useState<Client>({} as Client);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            getById(parseInt(id, 10)).then((response: Client) => {
                setClient(response);
            });
        } else {
            setIsEdit(false);
            setClient({} as Client);
        }
    }, [id]);

    const handleChanges = (e: ChangeEvent<HTMLInputElement>): void => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        });
    };

    const showAlert = (message: string, variant: string): void => {
        dispatch(setAlert({
            message: message,
            variant: variant,
            visible: true
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setClient({
            ...client,
            birthdate: date || new Date()
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            if (!isEdit) {
                await dispatch(newClient(client));
            } else {
                await dispatch(editClient(client));
            }
            navigate('/clients');
        } catch (error) {
            showAlert('Error al guardar el cliente.', 'danger');
        }
    };

    useEffect(() => {
        if (!isEmptyObject(clientError)) {
            showAlert(clientError[Object.keys(clientError)[0]][0], "danger");
        }
    }, [clientError]);

    return (
        <div>
            <h2 className='text-start'>{isEdit ? 'Editar' : 'Nuevo' } Cliente</h2>
            <Form onSubmit={handleSubmit}>
                <div className='row mb-5'>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Ingrese el nombre" value={client.name || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Ingrese el apellido paterno" value={client.lastName || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="formSecondLastName">
                            <Form.Label>Apellido Materno</Form.Label>
                            <Form.Control name="secondLastName" type="text" placeholder="Ingrese el apellido materno" value={client.secondLastName || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="formBirthdate">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <DatePicker
                                selected={client.birthdate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="phone" type="text" placeholder="Ingrese el teléfono" value={client.phone || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Ingrese el email" value={client.email || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <Button variant="secondary" onClick={() => navigate('/clients')}>Cancelar</Button>
                        <Button variant="primary" type="submit" className='ms-2'>Guardar</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ClientRegister;
