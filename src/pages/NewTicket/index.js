import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Button } from '../../components/Button/style';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';
import { FiPlusCircle, FiSave, FiRotateCcw } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function NewTicket() {
    const { user } = useContext(AuthContext);
    const [customersList, setCustomersList] = useState([]);
    const [subject, setSubject] = useState('');
    const [customer, setCustomer] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [complement, setComplement] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getCustomers() {
            await firebase
                .firestore()
                .collection('customers')
                .get()
                .then((querySnapshot) => {
                    let customersList = [];
                    querySnapshot.forEach((doc) => {
                        customersList.push({
                            uid: doc.id,
                            name: doc.data().name,
                            cnpj: doc.data().cnpj,
                            address: doc.data().address,
                        });
                    });

                    setCustomersList(customersList);
                })
                .catch((err) => {
                    console.error(
                        'Ocorreu um erro ao buscar os clientes: ' + err.message
                    );
                });
        }

        getCustomers();
    }, []);

    async function createNewTicket(e) {
        e.preventDefault();

        setLoading(true);

        if (
            subject === '' ||
            title === '' ||
            customer === '' ||
            status === '' ||
            complement === ''
        ) {
            toast.warning(
                'Opa! Todos os campos são de preenchimento obrigatório!'
            );
            setLoading(false);
            return;
        }

        const totalTickets = await firebase
            .firestore()
            .collection('tickets')
            .get();

        await firebase
            .firestore()
            .collection('tickets')
            .add({
                userId: user.uid,
                id: totalTickets.size + 1,
                subject: subject,
                title: title,
                customer: customer,
                status: status,
                complement: complement,
                createdAt: new Date(),
            })
            .then(() => {
                toast.success('Chamado criado com sucesso!');
                setSubject('');
                setTitle('');
                setCustomer('');
                setStatus('');
                setComplement('');
            })
            .catch((err) => {
                toast.error('Ops! Ocorreu um erro na criação do chamado');
                console.error(
                    'Ocorreu um erro na criação do chamado: ' + err.message
                );
            });

        setLoading(false);
    }

    function handleChangeSubject(e) {
        setSubject(e.target.value);
    }

    function handleChangeCustomer(e) {
        const selectedCustomer = customersList.find(
            (c) => c.uid === e.target.value
        );
        setCustomer(selectedCustomer);
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiPlusCircle />
                    Novo chamado
                </Title>

                <div className='container-form'>
                    <form onSubmit={createNewTicket}>
                        <div className='input-group'>
                            <label htmlFor=''>Cliente</label>
                            <select
                                value={customer.uid}
                                onChange={handleChangeCustomer}
                            >
                                <option value=''>
                                    {'<Selecione o cliente>'}
                                </option>
                                {customersList.map((customer) => {
                                    return (
                                        <option
                                            key={customer.uid}
                                            value={customer.uid}
                                        >
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>Assunto</label>
                            <select
                                value={subject}
                                onChange={handleChangeSubject}
                            >
                                <option value=''>
                                    {'<Selecione o assunto>'}
                                </option>
                                <option value='Suporte'>Suporte</option>
                                <option value='Infraestrutura'>
                                    Infraestrutura
                                </option>
                                <option value='Desenvolvimento'>
                                    Desenvolvimento
                                </option>
                                <option value='Comercial'>Comercial</option>
                                <option value='Base de Dados'>
                                    Base de Dados
                                </option>
                                <option value='Erro'>Erro</option>
                                <option value='Erro'>Bug</option>
                            </select>
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>Título</label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>Status</label>
                            <div className='flex'>
                                <label className='input-radio flex justify-center items-center'>
                                    <input
                                        type='radio'
                                        name='status'
                                        value='Em aberto'
                                        onChange={handleOptionChange}
                                    />
                                    <span>Em aberto</span>
                                </label>
                                <label className='input-radio flex justify-center items-center'>
                                    <input
                                        type='radio'
                                        name='status'
                                        value='Em andamento'
                                        onChange={handleOptionChange}
                                    />
                                    <span>Em andamento</span>
                                </label>
                                <label className='input-radio flex justify-center items-center'>
                                    <input
                                        type='radio'
                                        name='status'
                                        value='Atendido'
                                        onChange={handleOptionChange}
                                    />
                                    <span>Atendido</span>
                                </label>
                            </div>
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>Complemento</label>
                            <textarea
                                rows='6'
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='button-group'>
                            {!loading ? (
                                <Button type='submit' primary>
                                    <FiSave /> Salvar
                                </Button>
                            ) : (
                                <Button type='submit' primary load>
                                    <FiRotateCcw /> Salvando...
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </Container>
        </ContainerGrid>
    );
}
