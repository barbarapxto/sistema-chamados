//import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';
import { FiUsers } from 'react-icons/fi';

export default function Customers() {
    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiUsers />
                    Clientes
                </Title>
            </Container>
        </ContainerGrid>
    );
}
