import React from 'react';
import AppRoutes from './routes/Routes';
import Alert from './components/Alert';

const App: React.FC = () => {
    return (
        <div className="App">
            <Alert/>
            <AppRoutes />
        </div>
    );
};

export default App;
