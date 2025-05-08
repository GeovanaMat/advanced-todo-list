import {Meteor} from 'meteor/meteor'
import {TasksCollection} from "./TasksCollection"




Meteor.publish('tasks', function tasksPublication(mostrarCompletas,pesquisa,pagina, limite = 4){


    if (!this.userId) {
        return this.ready();   
    }

    const query = {
        $or: [
          { tipo: 'publico' },
          { usuarioId: this.userId }
        ]
      };
    
      if(!mostrarCompletas){
        query.situacao = {$in : ['cadastrada','pendente']}
      }

      if(pesquisa){
        query.nome = {$regex: new RegExp(pesquisa,'i')}
      }

      const skip = (pagina - 1) * limite;

    return TasksCollection.find(query, {skip,limit: limite});
  });