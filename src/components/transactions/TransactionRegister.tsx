import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { errorTransaction, newTransaction, editTransaction } from '../../features/transactions/transactionSlice';
import { setAlert } from '../../features/alerts/alertSlice';
import { getById } from '../../services/transactionService';
import { getAccount } from '../../services/savingAccountService';
import { getClientsList, getClient } from '../../services/clientService';
import { getSavingAccountsByClientId } from '../../services/savingAccountService';
import { AppDispatch, RootState } from '../../app/store';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Transaction } from '../../shared/Transaction';
import "react-datepicker/dist/react-datepicker.css";
import isEmptyObject from '../../helpers/ValidateEmptyObject';
import { Client } from '../../shared/Client';
import { SavingAccount } from '../../shared/SavingAccount';

interface RouteParams {
    id?: string;
}

const TransactionRegister: React.FC = () => {
    const dispatch                      = useDispatch<AppDispatch>();
    const transactionError              = useSelector((state: RootState) => errorTransaction(state));
    const [isEdit, setIsEdit]           = useState<boolean>(false);
    const [clientId, setClientId]       = useState<number | undefined>(undefined);
    const [clients, setClients]         = useState<Client[]>([]);
    const [client, setClient]           = useState<Client>({} as Client);
    const [accounts, setAccounts]       = useState<SavingAccount[]>([]);
    const { id }: RouteParams           = useParams();
    const navigate = useNavigate();
    
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = new Date().toLocaleDateString('es-MX', optionsDate);
    const [formattedDate, setDate]      = useState<string>(dateNow);
    
    const [transaction, setTransaction] = useState<Transaction>({} as Transaction);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            getById(parseInt(id, 10)).then((response: Transaction) => {
                setTransaction(response);

                getAccount(Number(response.savingAccountId)).then((account: SavingAccount) => {
                    setClientId(account.clientId);
                    getSavingAccountsByClientId(account.clientId).then((response: SavingAccount[]) => {
                        setAccounts(response);
                    })
                })
            });
        } else {
            setIsEdit(false);
            setTransaction({
                id: 0,
                folio: "",
                savingAccountId: 0,
                date: new Date(), 
                amount: 0,
                type: 1,
                status: 1,
                observations: "",
                isActive: true
            });
        }
    }, [id]);

    useEffect(() => {
        getClientsList().then((response: Client[]) => {
            setClients(response);
        }).catch((error: any) => {
            console.log(error);
        });
    }, []);

    const handleClientSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClientId(Number(event.target.value));

        getSavingAccountsByClientId(Number(event.target.value)).then((response: SavingAccount[]) => {
            setAccounts(response);
        }).catch((error: any) => {
            console.log(error);
        });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setTransaction({
            ...transaction,
            savingAccountId: Number(event.target.value)
        });
    };

    const handleChanges = (e: ChangeEvent<HTMLInputElement>): void => {
        setTransaction({
            ...transaction,
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            if (!isEdit) {
                await dispatch(newTransaction(transaction));
            } else {
                await dispatch(editTransaction(transaction));
            }
            navigate('/transactions');
        } catch (error) {
            showAlert('Error al guardar el transactione.', 'danger');
        }
    };

    useEffect(() => {
        if (!isEmptyObject(transactionError)) {
            showAlert(transactionError[Object.keys(transactionError)[0]][0], "danger");
        }
    }, [transactionError]);

    return (
        <div>
            <h2 className='text-start'>{isEdit ? 'Editar' : 'Nueva'} Transacción</h2>
            <Form onSubmit={handleSubmit}>
                <div className='row mb-5'>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="text" name="date" placeholder="Escribe aqui" value={formattedDate} disabled={true} readOnly/>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group className="mb-3" controlId="clientId">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Select aria-label="clientId" value={clientId} onChange={handleClientSelectChange}>
                                <option value="">Selecciona una opción</option>
                                {clients.map(data => (
                                    <option key={data.id} value={data.id}>{data.name} {data.lastName} {data.secondLastName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group className="mb-3" controlId="accountNumber">
                            <Form.Label>Cuenta de ahorro</Form.Label>
                            <Form.Select aria-label="accountNumber" value={transaction.savingAccountId} onChange={handleSelectChange}>
                                <option value="">Selecciona una opción</option>
                                {accounts.map(data => (
                                    <option key={data.id} value={data.id}>{data.accountNumber}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group className="mb-3" controlId="type">
                            <Form.Label>Tipo de transacción</Form.Label>
                            <Form.Select aria-label="type" value={transaction.type} onChange={handleSelectChange}>
                                <option value="">Selecciona una opción</option>
                                <option value="1">Deposito</option>
                                <option value="2">Retiro</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="amount">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control name="amount" type="number" placeholder="Ingrese el monto" value={transaction.amount || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="observations">
                            <Form.Label>Observaciones</Form.Label>
                            <Form.Control name="observations" type="text" placeholder="Ingrese las observaciones" value={transaction.observations || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <Button variant="secondary" onClick={() => navigate('/transactions')}>Cancelar</Button>
                        <Button variant="primary" type="submit" className='ms-2'>Guardar</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default TransactionRegister;
