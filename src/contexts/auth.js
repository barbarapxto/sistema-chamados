import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }

            setLoadingAuth(false);
        }

        loadStorage();
    }, []);

    async function signUp(name, email, password) {
        setLoadingAuth(true);
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                await firebase
                    .firestore()
                    .collection('users')
                    .doc(value.user.uid)
                    .set({
                        name: name,
                        email: email,
                        avatarUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: value.user.uid,
                            name: name,
                            email: email,
                            avatarUrl: null,
                        };

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoadingAuth(false);
                    });
            })
            .catch((error) => {
                toast.error('Ops! Algo deu errado!');
                console.log(error);
                setLoadingAuth(false);
            });
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                await firebase
                    .firestore()
                    .collection('users')
                    .doc(value.user.uid)
                    .get()
                    .then((snapshot) => {
                        let data = {
                            uid: value.user.uid,
                            name: snapshot.data().name,
                            email: snapshot.data().email,
                            avatarUrl: snapshot.data().avatarUrl,
                        };

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoadingAuth(false);
                    });
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Opa! Senha inválida!');
                }

                setLoadingAuth(false);
            });
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loadingAuth,
                signUp,
                signOut,
                signIn,
                setUser,
                storageUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
