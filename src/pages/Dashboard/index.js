//import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';
import { FiHome } from 'react-icons/fi';

export default function Dashboard() {
    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiHome />
                    Chamados
                </Title>
            </Container>
        </ContainerGrid>
    );
}
