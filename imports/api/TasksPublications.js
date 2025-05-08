import {Meteor} from 'meteor/meteor'
import {TasksCollection} from "./TasksCollection"




Meteor.publish('tasks', function tasksPublication(mostrarCompletas){


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
    return TasksCollection.find(query);
  });