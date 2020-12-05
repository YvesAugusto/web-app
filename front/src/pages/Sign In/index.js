import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function SignIn(){

    const [name, setName] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {name,CNPJ,whatsapp,city,uf,};
        console.log(data)
        try{
            const response = await api.post('/empresas', data).catch(err => {
                throw new Error(err);
              });
            alert(response.data.id);
            history.push("/")
        } catch(err){
            alert('Erro no cadastro, tente novamente')
        }
    }

    return(
        <div className="register-container">

            <div className="content">
                <section>
                    <h1> Cadastro </h1>
                    <p>Faça seu cadastro, entre na plataforma e registre os usuários da sua empresa</p>
                    <Link to="/" className="link"> 
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input type="text" value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Nome da empresa"/>

                    <input type="text" value={CNPJ} 
                    onChange={e => setCNPJ(e.target.value)}
                    placeholder="CNPJ" />

                    <input value={whatsapp} 
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="Whatsapp" />

                    <div className="input-group">
                        <input value={city} 
                        onChange={e => setCity(e.target.value)}
                        placeholder="Cidade"/>

                        <input value={uf} 
                        onChange={e => setUF(e.target.value)}
                        placeholder="UF" 
                        style={ {width: 80} }/>
                    </div>
                    <button className="button" type="submit"> Cadastrar </button>

                </form>
            </div>

        </div>
    );
}
