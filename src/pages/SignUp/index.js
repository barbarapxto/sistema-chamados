import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/img/logo.png';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        if (email === '' || password === '' || name === '') {
            toast.warning(
                'Todos os campos são de preenchimento obrigatório para o cadastro.'
            );
            return;
        }

        signUp(name, email, password);
    }
    return (
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='Logo da aplicação' />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <input
                        type='text'
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='text'
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
                    <button type='submit'>Cadastrar</button>
                </form>
                <Link to='/'>Já tem uma conta? Entre</Link>
            </div>
        </div>
    );
}
