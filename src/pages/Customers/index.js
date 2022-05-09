import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';
import { FiBriefcase, FiSave, FiTrash } from 'react-icons/fi';
import { Button } from '../../components/Button/style';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export default function Customers() {
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, []);

    async function getCustomers() {
        await firebase
            .firestore()
            .collection('customers')
            .get()
            .then((snapshot) => {
                const docs = snapshot.docs.map((doc) => {
                    return {
                        uid: doc.id,
                        name: doc.data().name,
                        cnpj: doc.data().cnpj,
                        address: doc.data().address,
                    };
                });

                if (!!docs) {
                    setCustomers(docs);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function saveCustomer(e) {
        e.preventDefault();

        if (name === '' || cnpj === '' || address === '') {
            toast.warning('Preencha todos os dados!');
            return;
        }

        await firebase
            .firestore()
            .collection('customers')
            .add({
                name: name,
                cnpj: cnpj,
                address: address,
            })
            .then(() => {
                toast.success('Cliente salvo com sucesso!');
                setCustomers([...customers, { name, cnpj, address }]);
                setName('');
                setCnpj('');
                setAddress('');
            })
            .catch((error) => {
                toast.error('Ops! Ocorreu algum erro!');
                console.log(error);
            });
    }

    async function deleteCustomer(id) {
        await firebase
            .firestore()
            .collection('customers')
            .doc(id)
            .delete()
            .then(() => {
                toast.success('Cliente excluído com sucesso!');
                getCustomers();
            })
            .catch((error) => {
                toast.error('Ops! Ocorreu algum erro na exclusão!');
                console.log(
                    'Ocorreu um erro durante a exclusão: ',
                    error.message
                );
            });
    }

    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiBriefcase />
                    Clientes
                </Title>

                <div className='container-form'>
                    <form onSubmit={saveCustomer}>
                        <div className='input-group'>
                            <label htmlFor=''>Nome fantasia</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>CNPJ</label>
                            <input
                                type='text'
                                value={cnpj}
                                onChange={(e) => {
                                    setCnpj(e.target.value);
                                }}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>Endereço</label>
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />
                        </div>

                        <div className='button-group'>
                            <Button type='submit' primary>
                                <FiSave /> Salvar
                            </Button>
                        </div>
                    </form>
                </div>

                <div className='container-form'>
                    {!!customers ? (
                        <table className='table'>
                            <thead>
                                <th>Nome fantasia</th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                                <th>#</th>
                            </thead>
                            <tbody>
                                {customers.map((customer) => {
                                    return (
                                        <tr key={customer.uid}>
                                            <td data-label='Nome fantasia'>
                                                {customer.name}
                                            </td>
                                            <td data-label='CNPJ'>
                                                {customer.cnpj}
                                            </td>
                                            <td data-label='Endereço'>
                                                {customer.address}
                                            </td>
                                            <td
                                                data-label='#'
                                                className='button-group'
                                            >
                                                <Button
                                                    red
                                                    onClick={() =>
                                                        deleteCustomer(
                                                            customer.uid
                                                        )
                                                    }
                                                >
                                                    <FiTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <h3>Não há clientes cadastrados</h3>
                    )}
                </div>
            </Container>
        </ContainerGrid>
    );
}
