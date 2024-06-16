import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, setAuthToken } from '../../services/userService';
import { User } from '../../shared/User';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setAuthToken(token);
            const fetchUsers = async () => {
                try {
                    const response = await getUsers();
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
    
            fetchUsers();
        }
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario');
        }
    };

    const handleNew = () => {
        navigate('/users/register');
    };

    const handleEditData = (id: number) => {
        navigate(`/users/register/${id}`);
    };

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
            </div>
            {users.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>Sin información registrada</h4>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {users.map((item: User) => (
                        <div key={item.id} className="col-12 p-2">
                            <Card className="card">
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                    <i className='h1 bi bi-clipboard-check me-5 ms-3'></i>
                                    <div className="col ps-4">
                                        <Card.Body className="text-start">
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <div className="col-5">
                                                    <Card.Title>{item.name} {item.lastName}</Card.Title>
                                                </div>
                                                <div className="col-4">
                                                    <p className="m-0">Email: {item.email}</p>
                                                </div>
                                                <div className="col-3">
                                                    <div className="d-flex flex-row justify-content-end align-items-center">
                                                        <Button className="me-2" variant="outline-secondary" onClick={() => handleEditData(item.id)}><i className="bi bi-pencil-square"></i></Button>
                                                        <Button className="me-2" variant="outline-danger" onClick={() => handleDelete(item.id)}><i className="bi bi-trash"></i></Button>
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

export default UserList;
