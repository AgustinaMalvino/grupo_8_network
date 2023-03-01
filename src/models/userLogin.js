const fs = require('fs');

const userLogin = {
    // UBICACIÓN DE LA BASE DE DATOS DE LOS USUARIOS
    userDataBase: './src/data/users.json',

    // GENERADOR DE NUEVOS IDs
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        } else {return 1}
    },

    // CONVERTIR LOS DATOS JSON A OBJETOS LITERALES
    getData: function(){
        return JSON.parse(fs.readFileSync(this.userDataBase, 'utf-8'))
    },

    // BUSCA A TODOS LOS USUARIOS DE LA BASE DE DATOS
    findAll: function(){
        return this.getData();
    },

    // BUSCA A UN USUARIO POR SU ID
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound;
    },

    // BUSCA A UN USUARIO POR UN CAMPO ESPECÍFICO
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] == text);
        return userFound;
    },

    // GUARDA UN NUEVO USUARIO EN LA BASE DE DATOS
    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.userDataBase, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    // ELIMINAR USUARIO EN LA BASE DE DATOS
    delete: function(id){
        let allUsers = this.findAll();
        let finalUser = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.userDataBase, JSON.stringify(finalUser, null, ' '));
    }
}

module.exports = userLogin;