import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
    const setIsAuthenticated = (isAuthenticated: boolean) => {
        console.log('Mocked setIsAuthenticated called with:', isAuthenticated);
    };

    test('renders Login form', () => {
        render(
            <Router>
                {/* <Login setIsAuthenticated={setIsAuthenticated} /> */}
            </Router>
        );

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('submits login form', () => {
        render(
            <Router>
                {/* <Login setIsAuthenticated={setIsAuthenticated} /> */}
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Aquí puedes agregar las aserciones para la lógica de envío del formulario
    });
});
