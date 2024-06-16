import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { selectAll, filterData, getSavingAccounts, deleteSavingAccount } from '../../features/savingAccounts/savingAccountSlice';
// import savingAccountImg from '../../assets/images/SavingAccount.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SavingAccount } from '../../shared/SavingAccount';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from './../../helpers/CurrencyFormat';

const SavingAccountList: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    const savingAccountState = useSelector((state: RootState) => selectAll(state));

    useEffect(() => {
        dispatch(getSavingAccounts());
    }, [dispatch]);

    const handleDeleteData = (id: number) => {
        dispatch(deleteSavingAccount(id));
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        dispatch(filterData({ keyword: e.target.value }));
    };

    const handleNew = () => {
        navigate('/saving-accounts/register');
    };

    const handleEditData = (id: number) => {
        navigate(`/saving-accounts/register/${id}`);
    };

    const ImgCell: React.FC<{ data: any }> = ({ data }) => (
        <div className="chart-cell">
            {/* <img src={savingAccountImg} alt="SavingAccount" style={{ width: '30px', height: 'auto' }} /> */}
        </div>
    );

    const ActionCell: React.FC<{ data: any }> = ({ data }) => (
        <div className="action-cell">
            <Button className="me-2" variant="outline-secondary" onClick={() => handleEditData(data.id)}><i className="bi bi-pencil-square"></i></Button>
            <Button className="me-2" variant="outline-danger" onClick={() => handleDeleteData(data.id)}><i className="bi bi-trash"></i></Button>
        </div>
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end p-2">
                <Button className="me-2" variant="success" onClick={handleNew}>
                    <i className="bi bi-plus-circle"></i>
                    <span className='ms-2'> Nuevo</span>
                </Button>
                <Form.Control type="text" className='w-25' placeholder="Buscar" value={keyword} onChange={handleSearchChange} />
            </div>
            {savingAccountState.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>Sin información registrada</h4>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center align-items-center">    
                    {savingAccountState.map((item: SavingAccount) => (
                        <div key={item.id} className="col-12 p-2">
                            <Card className="card">
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                    <i className='h1 bi bi-wallet2 me-5 ms-3'></i>
                                    <div className="col">
                                        <Card.Body className="text-start">
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <div className="col-5">
                                                    <Card.Title>{item.client?.name} {item.client?.lastName} {item.client?.secondLastName}</Card.Title>
                                                    <p className="m-0">No. de cuenta: <b>{item.accountNumber}</b></p>
                                                </div>
                                                <div className="col-5">
                                                    <h4 className="m-0">Disponible: {formatCurrency(item.balance)}</h4>
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
}

export default SavingAccountList;
