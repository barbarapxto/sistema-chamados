import './header.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/img/avatar.png';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Header() {
    const { user, signOut } = useContext(AuthContext);

    useEffect(() => {
        const hamburguer = document.querySelector('.menu-hb');
        const sidebar = document.querySelector('.sidebar');
        hamburguer.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            hamburguer.classList.toggle('active');
        });
    }, []);

    return (
        <div>
            <div className='menu-hb'></div>
            <div className='sidebar'>
                <div className='sidebar-avatar'>
                    <img
                        className='user-avatar'
                        src={!!user.avatarUrl ? user.avatarUrl : avatar}
                        alt='Foto do usuário'
                    />
                    <p>{user.name}</p>
                </div>

                <nav className='sidebar-menu'>
                    <ul>
                        <Link to='/dashboard'>
                            <FiHome />
                            Chamados
                        </Link>
                        <Link to='/customers'>
                            <FiUsers />
                            Clientes
                        </Link>
                        <Link to='/profile'>
                            <FiSettings /> Configurações
                        </Link>
                        <Link onClick={signOut}>
                            <FiLogOut /> Sair
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
