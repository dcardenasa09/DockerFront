import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { errorSavingAccount, newSavingAccount, editSavingAccount } from '../../features/savingAccounts/savingAccountSlice';
import { setAlert } from '../../features/alerts/alertSlice';
import { getById } from '../../services/savingAccountService';
import { getClientsList } from '../../services/clientService';
import { AppDispatch, RootState } from '../../app/store';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SavingAccount } from '../../shared/SavingAccount';
import "react-datepicker/dist/react-datepicker.css";
import isEmptyObject from '../../helpers/ValidateEmptyObject';
import { Client } from '../../shared/Client';

interface RouteParams {
    id?: string;
}

const SavingAccountRegister: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const savingAccountError = useSelector((state: RootState) => errorSavingAccount(state));
    const { id }: RouteParams = useParams();
    const navigate = useNavigate();

    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = new Date().toLocaleDateString('es-MX', optionsDate);
    const [formattedDate, setDate] = useState<string>(dateNow);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [savingAccount, setSavingAccount] = useState<SavingAccount>({} as SavingAccount);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            getById(parseInt(id, 10)).then((response: SavingAccount) => {
                setSavingAccount(response);
            });
        } else {
            setIsEdit(false);
            setSavingAccount({} as SavingAccount);
        }
    }, [id]);

    const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {
        getClientsList().then((response: Client[]) => {
            setClients(response);
        }).catch((error: any) => {
            console.log(error);
        });
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSavingAccount({
            ...savingAccount,
            clientId: Number(event.target.value)
        });
    };

    const handleChanges = (e: ChangeEvent<HTMLInputElement>): void => {
        setSavingAccount({
            ...savingAccount,
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
                await dispatch(newSavingAccount(savingAccount));
            } else {
                await dispatch(editSavingAccount(savingAccount));
            }
            navigate('/saving-accounts');
        } catch (error) {
            showAlert('Error al guardar el savingAccounte.', 'danger');
        }
    };

    useEffect(() => {
        if (!isEmptyObject(savingAccountError)) {
            showAlert(savingAccountError[Object.keys(savingAccountError)[0]][0], "danger");
        }
    }, [savingAccountError]);

    return (
        <div>
            <h2 className='text-start'>{isEdit ? 'Editar' : 'Nueva'} Cuenta de Ahorro</h2>
            <Form onSubmit={handleSubmit}>
                <div className='row mb-5'>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group className="mb-3" controlId="form">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="text" name="date" placeholder="Escribe aqui" value={formattedDate} disabled={true} readOnly/>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group className="mb-3" controlId="form">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Select aria-label="mimbros" value={savingAccount.clientId} onChange={handleSelectChange}>
                                <option value="">Selecciona una opción</option>
                                {clients.map(data => (
                                    <option key={data.id} value={data.id}>{data.name} {data.lastName} {data.secondLastName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="accountNumber">
                            <Form.Label>Número de cuenta</Form.Label>
                            <Form.Control name="accountNumber" type="text" placeholder="Ingrese el número de cuenta" value={savingAccount.accountNumber || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6 text-start my-2'>
                        <Form.Group controlId="balance">
                            <Form.Label>Saldo Inicial</Form.Label>
                            <Form.Control name="balance" type="number" placeholder="Ingrese el número de cuenta" value={savingAccount.balance || ''} onChange={handleChanges} />
                        </Form.Group>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <Button variant="secondary" onClick={() => navigate('/saving-accounts')}>Cancelar</Button>
                        <Button variant="primary" type="submit" className='ms-2'>Guardar</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default SavingAccountRegister;
