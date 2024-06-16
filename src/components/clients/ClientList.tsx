import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { selectAll, filterData, getClients, deleteClient } from '../../features/clients/clientSlice';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../shared/Client';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ClientList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const clientState = useSelector((state: RootState) => selectAll(state));
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const handleDeleteData = (id: number) => {
        dispatch(deleteClient(id));
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        dispatch(filterData({ keyword: e.target.value }));
    };

    const handleNew = () => {
        navigate('/clients/register');
    };

    const handleEditData = (id: number) => {
        navigate(`/clients/register/${id}`);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end p-2">
                <Button className="me-2" variant="success" onClick={handleNew}>
                    <i className="bi bi-plus-circle"></i>
                    <span className='ms-2'> Nuevo</span>
                </Button>
                <Form.Control type="text" className='w-25' placeholder="Buscar" value={keyword} onChange={handleSearchChange} />
            </div>
            {clientState.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>Sin información registrada</h4>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {clientState.map((item: Client) => (
                        <div key={item.id} className="col-12 p-2">
                            <Card className="card">
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                    <i className='h1 bi bi-person-circle me-5 ms-3'></i>
                                    <div className="col ps-4">
                                        <Card.Body className="text-start">
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <div className="col-5">
                                                    <Card.Title>{item.name} {item.lastName} {item.secondLastName}</Card.Title>
                                                    {/* <p className="m-0">Edad: {item.age} años</p> */}
                                                </div>
                                                <div className="col-5">
                                                    <p className="m-0">Teléfono: {item.phone}</p>
                                                    <p className="m-0">Email: {item.email}</p>
                                                </div>
                                                <div className="col-2">
                                                    <div className="d-flex flex-row justify-content-end align-items-center">
                                                        <Button className="me-2" variant="outline-secondary" onClick={() => handleEditData(item.id)}><i className="bi bi-pencil-square"></i></Button>
                                                        <Button className="me-2" variant="outline-danger" onClick={() => handleDeleteData(item.id)}><i className="bi bi-trash"></i></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientList;
