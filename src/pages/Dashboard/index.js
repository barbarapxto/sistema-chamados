import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';
import { FiList, FiPlus, FiSearch, FiEdit } from 'react-icons/fi';
import { Button } from '../../components/Button/style';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

const listRef = firebase
    .firestore()
    .collection('tickets')
    .orderBy('id', 'desc');

export default function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState(0);

    useEffect(() => {
        getTickets();
    }, []);

    async function getTickets() {
        await listRef
            .limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot);
            })
            .catch((error) => {
                toast.error('Ops! Ocorreu algum erro ao buscar os chamados!');
                console.error(
                    'Ocorreu um erro ao buscar chamados: ',
                    error.message
                );
                setLoading(false);
                setLoadingMore(false);
            });
    }

    function updateState(snapshot) {
        const isEmpty = snapshot.size === 0;

        if (!isEmpty) {
            const ticketsList = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    info: doc.data(),
                };
            });

            //pega o último documento buscado
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];

            setTickets((t) => [...tickets, ...ticketsList]);
            setIsEmpty(false);
            setLastDocs(lastDoc);
            setLoading(false);
            setLoadingMore(false);
        } else {
            setIsEmpty(true);
        }
    }

    async function handleMore() {
        setLoadingMore(true);

        await listRef
            .startAfter(lastDocs)
            .limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot);
            })
            .catch((error) => {
                toast.error('Ops! Ocorreu algum erro ao buscar os chamados!');
                console.error(
                    'Ocorreu um erro ao buscar chamados: ',
                    error.message
                );
            });

        setLoadingMore(false);
    }

    function handleViewDetails(ticket) {
        console.log(ticket);
    }
    function handleEdit(ticket) {
        console.log(ticket);
    }

    if (loading || loadingMore) {
        return (
            <ContainerGrid>
                <Header />
                <Container>
                    <Title>
                        <FiList />
                        Chamados
                    </Title>
                    <h2>Buscando chamados...</h2>
                </Container>
            </ContainerGrid>
        );
    }

    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiList />
                    Chamados
                </Title>

                {tickets.length === 0 ? (
                    <div className='container-form flex flex-column justify-center items-center'>
                        <p>Nenhum chamado registrado...</p>
                        <Link to='/new'>
                            <Button green>
                                <FiPlus />
                                Adicionar chamado
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className='flex justify-end items-center mb-8'>
                            <Link to='/new'>
                                <Button green>
                                    <FiPlus />
                                    Adicionar chamado
                                </Button>
                            </Link>
                        </div>
                        <div className='container-form'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nº Ticket</th>
                                        <th scope='col'>Cliente</th>
                                        <th scope='col'>Assunto</th>
                                        <th scope='col'>Título</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Criado em</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket) => {
                                        return (
                                            <tr key={ticket.id}>
                                                <td data-label='Nº Ticket'>
                                                    {ticket.info.id}
                                                </td>
                                                <td data-label='Cliente'>
                                                    {ticket.info.customer.name}
                                                </td>
                                                <td data-label='Assunto'>
                                                    {ticket.info.subject}
                                                </td>
                                                <td data-label='Título'>
                                                    {ticket.info.title}
                                                </td>
                                                <td data-label='Status'>
                                                    {ticket.info.status ===
                                                        'Em aberto' && (
                                                        <span className='badge badge-default'>
                                                            {ticket.info.status}
                                                        </span>
                                                    )}
                                                    {ticket.info.status ===
                                                        'Atendido' && (
                                                        <span className='badge badge-green'>
                                                            {ticket.info.status}
                                                        </span>
                                                    )}
                                                    {ticket.info.status ===
                                                        'Em andamento' && (
                                                        <span className='badge badge-blue'>
                                                            {ticket.info.status}
                                                        </span>
                                                    )}
                                                </td>
                                                <td data-label='Criador em'>
                                                    {format(
                                                        ticket.info.createdAt.toDate(),
                                                        'dd/MM/yyyy hh:mm'
                                                    )}
                                                </td>
                                                <td
                                                    data-label='#'
                                                    className='button-group'
                                                >
                                                    <Button
                                                        primary
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                ticket
                                                            )
                                                        }
                                                    >
                                                        <FiSearch />
                                                    </Button>
                                                    <Button
                                                        orange
                                                        onClick={() =>
                                                            handleEdit(ticket)
                                                        }
                                                    >
                                                        <FiEdit />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {!loadingMore && !isEmpty && (
                                <div className='flex justify-center items-center'>
                                    <Button secondary onClick={handleMore}>
                                        Carregar mais
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </ContainerGrid>
    );
}
