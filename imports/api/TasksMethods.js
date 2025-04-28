import {Meteor} from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.methods({
    "tasks.insert"(doc){
        return TasksCollection.insertAsync(doc);
    },
    "tasks.delete"({_id}){
        return TasksCollection.removeAsync(_id);
    },
    "tasks.findById"(_id){
        return TasksCollection.findOne({_id})
    },
    "tasks.updateTask"({ _id, nome, descricao, situacao, data, usuario}) {
        console.log(_id)
        return TasksCollection.updateAsync(_id, {
          $set: { 
            nome: nome,
            descricao: descricao,
            situacao: situacao,
            data: data,
            usuario: usuario
        },
        });
    },
})