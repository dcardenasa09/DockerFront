import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserList from '../UserList';

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] }))
}));

describe('UserList Component', () => {
    test('renders UserList component', async () => {
        render(
            <Router>
                <UserList />
            </Router>
        );

        expect(await screen.findByText(/add user/i)).toBeInTheDocument();
    });
});
