import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { FiPower, FiTrash } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

export default function Perfil(){
    const [usuarios, setUsuarios] = useState([]);
    const history=useHistory();

    const ongName=localStorage.getItem('empresaNome');
    const ongID=localStorage.getItem('empresaId');

    useEffect(() => {
        api.get('perfil', {
        headers: {
            Authorization: ongID
        }}).then(response => {setUsuarios(response.data)})
    }, [ongID]);

    async function handleDeleteusuario(id){
        try{

            await api.delete(`/usuarios/${id}`,{
                headers:{
                    Authorization: ongID
                }
            })

            setUsuarios(usuarios.filter(usuario=>usuario.id!== id));

        }catch{
            alert("Erro ao deletar usuario")
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }


    return (
    
        <div className="profile-container">
            <header>
                <p>Bem-vindo, {ongName}</p>

                <Link to="/usuarios/new" className="button"> Cadastrar novo usuario </Link>
                <button type="button" onClick={() => handleLogout()}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Usuarios cadastrados</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key = {usuario.id}>
                        <strong> Usuario: </strong>
                        <p>{usuario.nome}</p>
                        <button type="button" onClick={() => handleDeleteusuario(usuario.id)}>
                            <FiTrash size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}
