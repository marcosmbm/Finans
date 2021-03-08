import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseconnection';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [erroEmail,setErroEmail] = useState('');
    const [erroSenha,setErroSenha] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(()=> {
       async function loadStorage(){
           const storageUser = await AsyncStorage.getItem('Auth_user');

           if(storageUser){
               setUser(JSON.parse(storageUser));
               setLoading(false);
           }

           setLoading(false);
       }
       
       loadStorage();
    }, []);

    //Funcao para logar o usario
    async function signIn(email, password){
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot)=>{
                let data = {
                  uid: uid,
                  nome: snapshot.val().nome,
                  email: value.user.email,
                };

                setUser(data);
                storageUser(data);
                setErroEmail('');
                setErroSenha('');
                setLoadingAuth(false);
            })
        })
        .catch((error)=> {
            if (error.code == 'auth/wrong-password') {
                setErroSenha('Senha Incorreta');
                setErroEmail('');
                setLoadingAuth(false);
            }
            else if(error.code == 'auth/user-not-found'){
                setErroEmail('Usuário não encontrado');
                setErroSenha('');
                setLoadingAuth(false);
            }
            else if(error.code == 'auth/invalid-email'){
                setErroEmail('Email Inválido');
                setErroSenha('');
                setLoadingAuth(false);
            }
            else if(error.code == 'undefined'){
                setErroEmail('Usuário Indefinido');
                setErroSenha('');
                setLoadingAuth(false);
            }
            else{
                alert(error.code);
                setLoadingAuth(false);
            }
        });
    }
    
    //Cadastrar usuario
    async function signUp(email, password, nome){
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            let user = value.user
            user.sendEmailVerification();
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome,
                totReceitas: 0,
                totDespesas: 0,
                quantContas: 0
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((error)=> {
            if(error.code == 'auth/weak-password'){
                alert('Por favor, digite uma senha com no mínimo 6 caracteres');
                setLoadingAuth(false);
            }
            else if(error.code == 'auth/invalid-email'){
                alert('Email inválido');
                setLoadingAuth(false);
            }
            else if(error.code == 'auth/email-already-in-use'){
                alert('Usuário Cadastrado');
                setLoadingAuth(false);
            }
            else{
                alert(error.code);
                setLoadingAuth(false);
            }
        });
    }

    //Funcao para redefinir uma senha
    async function redefinir(email){
        await firebase.auth().sendPasswordResetEmail(email)
        .catch((error)=> {
            if(error.code == 'auth/user-not-found'){
                alert('Usuário não encontrado');
               
            }
            else if(error.code == 'auth/invalid-email'){
                alert('Email Inválido');
                
            }
            else if(error.code == 'undefined'){
                alert('Usuário Indefinido');
               
            }
            else{
                alert(error.code);
            }
        });      
    }


    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then( () => {
           setUser(null); 
        })

    }

    return(
     <AuthContext.Provider value={{ signed: !!user , user,erroEmail,erroSenha, signUp, signIn,signOut,redefinir, loading,loadingAuth }}>
         {children}
     </AuthContext.Provider>   
    );
}

export default AuthProvider;