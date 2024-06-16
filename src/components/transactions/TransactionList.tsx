import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAll, filterData, getTransactions, returnTransaction, deleteTransaction } from '../../features/transactions/transactionSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip';
import { Transaction } from '../../shared/Transaction';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../helpers/CurrencyFormat';
import { format } from 'date-fns';

interface TransactionListProps {}

const TransactionList: React.FC<TransactionListProps> = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    const transactionState: Transaction[] = useSelector((state: RootState) => selectAll(state));

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    const handleDeleteData = (id: number) => {
        dispatch(deleteTransaction(id));
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        dispatch(filterData({ keyword: e.target.value }));
    };

    const handleNew = () => {
        navigate('/transactions/register');
    };

    const handleEditData = (id: number) => {
        navigate(`/transactions/register/${id}`);
    };

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>Devolver libros</Tooltip>
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end p-2">
                <div>
                    <div className="d-flex justify-content-start">
                        <Button className="me-2" variant="success" onClick={handleNew}>
                            <i className="bi bi-plus-circle"></i>
                            <span className='ms-2'> Nuevo</span>
                        </Button>
                    </div>
                </div>
                <Form.Control type="text" className='w-25' placeholder="Buscar" value={keyword} onChange={handleSearchChange}/>
            </div>
            {transactionState.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>Sin información registrada</h4>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {transactionState.map((item: Transaction) => (
                        <div key={item.id} className="col-12 p-2">
                            <Card className="card">
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                    <i className='h1 bi bi-cash-coin me-5 ms-3'></i>
                                    <div className="col ps-4">
                                        <Card.Body className="text-start">
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                 <div className="col-3">
                                                    <Card.Title>{item.folio}</Card.Title>
                                                    <p className="m-0">Tipo: { item.type === 1 ? 'Deposito' : 'Retiro' }</p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="m-0">Fecha: {format(new Date(item.date), 'dd-MM-yyyy')}</p>
                                                    <p className="m-0">Monto: <b>{formatCurrency(item.amount)}</b></p>
                                                    <p className="m-0">Observaciones: {item.observations}</p>
                                                </div>
                                                <div className="col-3">
                                                    <div className="d-flex flex-row justify-content-end align-items-center">
                                                        <h4 className='m-0'>
                                                            <Badge bg={'success'}>{'Completado'}</Badge>
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="col-3">
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

export default TransactionList;
