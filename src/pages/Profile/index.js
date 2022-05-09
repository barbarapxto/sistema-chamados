import './profile.css';
import { useContext, useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { Button } from '../../components/Button/style';
import { ContainerGrid } from '../../components/ContainerGrid/style';
import { Container } from '../../components/Container/style';
import { FiUser, FiSave, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/img/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import firebase from '../../services/firebaseConnection';
//import Spinner from '../../components/Spinner';

export default function Profile() {
    const { user, setUser, storageUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    async function handleUpdateUser(e) {
        e.preventDefault();
        console.log(imageAvatar);
        if (imageAvatar === null && name !== '') {
            await firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .update({ name: name })
                .then(() => {
                    let data = {
                        ...user,
                        name,
                    };

                    setUser(data);
                    storageUser(data);

                    toast.success('Nome alterado com sucesso!');
                })
                .catch((error) => {
                    toast.error('Ops! Ocorreu algum erro!');
                    console.log(error);
                });
        } else if (name !== '' && imageAvatar !== null) {
            handleUpload();
        }
    }

    async function handleUpload() {
        await firebase
            .storage()
            .ref(`images/${user.uid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                getAvatarUrl();
            })
            .catch((error) => {
                toast.error('Ops! Ocorreu algum erro!');
                console.log(error);
            });
    }

    async function getAvatarUrl() {
        await firebase
            .storage()
            .ref(`images/${user.uid}`)
            .child(imageAvatar.name)
            .getDownloadURL()
            .then(async (url) => {
                updateUserAvatar(url);
            })
            .catch((error) => {
                toast.error('Ops! Ocorreu algum erro!');
                console.log(error);
            });
    }

    async function updateUserAvatar(url) {
        await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                avatarUrl: url,
                name: name,
            })
            .then(() => {
                let data = {
                    ...user,
                    avatarUrl: url,
                    name: name,
                };

                setUser(data);
                storageUser(data);
                setImageAvatar(user.avatarUrl);
                toast.success('Foto enviada com sucesso!');
            });
    }

    function handleAvatarUrl(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                toast.info('Envie uma imagem do tipo PNG ou JPEG.');
                setImageAvatar(null);
                return null;
            }
        }
    }

    return (
        <ContainerGrid>
            <Header />
            <Container>
                <Title>
                    <FiUser />
                    Meu Perfil
                </Title>
                <div className='container-form'>
                    <form
                        onSubmit={(e) => {
                            handleUpdateUser(e);
                        }}
                    >
                        <label className='avatar'>
                            <span>
                                <FiUpload color='#fff' size={24} />
                            </span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleAvatarUrl}
                            />
                            {avatarUrl === null ? (
                                <img
                                    src={avatar}
                                    height={200}
                                    width={200}
                                    alt='Avatar do usuário'
                                />
                            ) : (
                                <img
                                    src={avatarUrl}
                                    height={200}
                                    width={200}
                                    alt='Avatar do usuário'
                                />
                            )}
                        </label>

                        <div className='input-group'>
                            <label htmlFor=''>Nome</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor=''>E-mail</label>
                            <input type='text' value={email} readOnly />
                        </div>

                        <div className='button-group'>
                            <Button type='submit' primary>
                                <FiSave /> Salvar
                            </Button>

                            {imageAvatar !== null && (
                                <Button
                                    red
                                    onClick={() => {
                                        setImageAvatar(null);
                                        setAvatarUrl(null);
                                    }}
                                >
                                    Cancelar Upload
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </Container>
        </ContainerGrid>
    );
}
