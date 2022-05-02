import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';

import { FiSettings } from 'react-icons/fi';

export default function Profile() {
    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiSettings />
                    Meu Perfil
                </Title>
                <h1>Profile</h1>
            </Container>
        </ContainerGrid>
    );
}
