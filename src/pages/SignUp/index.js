import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export default function SignUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        alert('teste');
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
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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
