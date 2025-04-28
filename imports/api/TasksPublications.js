import {Meteor} from 'meteor/meteor'
import {TasksCollection} from "./TasksCollection"




Meteor.publish('tasks', function tasksPublication(){

    if (!this.userId) {
        return this.ready();   
    }
    return TasksCollection.find({
        $or: [
            {tipo: 'publico'},
            {usuarioId: this.userId}
        ]
    });
  });