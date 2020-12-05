const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const {page = 1} = request.query;
        const [count] = await connection('usuarios').count();
        console.log(count);
        const usuarios = await connection('usuarios').
            join('empresas','empresas.id','=','usuarios.empresa_id').
            limit(5).
            offset((page - 1)*5).
            select('*');
        response.header('X-Total-Count', count['count(*)']);
        return response.json(usuarios);
    },

    async create(request, response) {
        const {nome} = request.body;
        const empresa_id = request.headers.authorization; 
        const [id] = await connection('usuarios').insert({nome,empresa_id});
        return response.json({ id });
    },

    async delete(request, response) {
        const {id} = request.params;
        const empresa_id = request.headers.authorization;
        const incident = await connection('usuarios').where('id', id).select('empresa_id').first();
        if(incident.empresa_id!=empresa_id){
            return response.status(401).json({error: "Operation not permitted!"});
        }else{
            await connection('usuarios').where('id', id).delete();
            return response.status(204).send(); 
        }
    }
};