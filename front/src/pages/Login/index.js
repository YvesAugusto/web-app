import React, {useState} from 'react';
import { FiEdit } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api';

import './styles.css';

export default function Login(){

    const [id,setID] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('/login', { id })
            localStorage.setItem('empresaId', id)
            localStorage.setItem('empresaNome', response.data.name)
            history.push('/perfil')
        }catch(err){
            alert("Falha no login")
        }

    }

    return(

        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1> Faça seu login </h1>
                    <input 
                    value={id}
                    onChange={e => setID(e.target.value)}
                    placeholder="Seu ID"/>
                    <button className="button" type="submit"> Entrar </button>
                    <Link to="/cadastro"> 
                        <FiEdit size={16} color="blue" style={{marginRight:10}}/>
                        Cadastrar-se </Link>
                </form>
            </section>

        </div>

    );
}
