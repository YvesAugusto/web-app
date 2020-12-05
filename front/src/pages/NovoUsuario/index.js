import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function NovoUsuario(){

    const [nome, setNome] = useState('');
    const empresaId=localStorage.getItem('empresaId');
    const history = useHistory();

    async function handleNewUser(e){
        e.preventDefault();
        const data = {
            nome,
        };

        try{

            await api.post('usuarios', data, {
                headers:{
                    Authorization: empresaId
                }
            })

            history.push('/perfil')

        }catch{
            alert("Erro ao cadastrar caso")
        }

    }

    return (
        <div className="new-incident-container">

            <div className="content">
                <section>
                    <h1> Cadastrar novo caso </h1>
                    <p>Descreva o caso detalhadamente</p>
                    <Link to="/perfil" className="link"> 
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para Home </Link>
                </section>

                <form onSubmit={handleNewUser}>
                    <input type="text" 
                   placeholder="Nome do usuário"
                   value={nome}
                   onChange={e=>setNome(e.target.value)}/>

                    <button className="button" type="submit"> Cadastrar </button>

                </form>
            </div>

        </div>
    );
}
