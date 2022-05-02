import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AuthProvider from './contexts/auth';
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer theme='colored' autoClose={3000} />
                <Routes />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
