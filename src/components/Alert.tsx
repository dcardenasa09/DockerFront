import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../features/alerts/alertSlice';
import { RootState } from '../app/store';
import Alert from 'react-bootstrap/Alert';

const AlertMessage: React.FC = () => {
    const dispatch = useDispatch();
    const alert    = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearAlert());
        }, 5000);

        return () => clearTimeout(timer);
    }, [dispatch, alert]);

    return (
        <>
            {alert.message && (
                <Alert className='alert' show={alert.visible} variant={alert.variant}>
                    <Alert.Heading>{alert.variant !== 'success' ? 'Oh no!' : 'Genial'}</Alert.Heading>
                    <p>{alert.message}</p>
                </Alert>
            )}
        </>
    );
}

export default AlertMessage;