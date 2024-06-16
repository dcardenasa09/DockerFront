import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, FloatingLabel  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userService';
import './../assets/styles/Login.scss';

const Login: React.FC = () => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await login(email, password);
            const token = response.data.accessToken;
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in', error);
            alert('Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="login-container w-100 d-flex justify-content-center align-items-center">
            <Card className='p-5'>
                <Card.Body className='p-4'>
                    <Row>
                        <Col>
                            <h2 className='mb-3'>Iniciar sesión</h2>
                            <i className='h1 bi bi-person-circle'></i>
                            <Form onSubmit={handleSubmit} className='text-start mt-4'>
                                <Form.Group controlId="email" className='mb-4'>
                                    <FloatingLabel
                                        controlId="email"
                                        label="Correo electrónico"
                                        className="mb-3">
                                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="password" className='mb-5'>
                                    <FloatingLabel
                                        controlId="email"
                                        label="Contraseña"
                                        className="mb-3">
                                        <Form.Control type="password" placeholder="Ingresa la contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Button variant="success w-100" size="lg" type="submit">Iniciar sesión</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
