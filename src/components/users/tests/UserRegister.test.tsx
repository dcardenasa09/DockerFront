import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRegister from '../UserRegister';

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: { name: '', email: '' } })),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({}))
}));

describe('UserRegister Component', () => {
    test('renders UserRegister component', () => {
        render(
            <Router>
                <UserRegister />
            </Router>
        );

        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    test('submits UserRegister', () => {
        render(
            <Router>
                <UserRegister />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        // Add assertions for form submission logic
    });
});
