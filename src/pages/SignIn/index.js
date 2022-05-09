import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';
import logo from '../../assets/img/logo.png';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        if (email === '') {
            toast.warning('Por favor, informe o e-mail!');
            return;
        }

        if (password === '') {
            toast.warning('Por favor, informe a senha!');
            return;
        }

        signIn(email, password);
    }
    return (
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='Logo da aplicação' />
                </div>

                <form className='form-login' onSubmit={handleSubmit}>
                    <h1>Bem-vindo(a)</h1>
                    <input
                        type='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>
                        {loadingAuth ? 'Carregando...' : 'Entrar'}
                    </button>
                </form>
                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    );
}
