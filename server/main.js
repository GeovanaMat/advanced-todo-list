import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import "../imports/api/TasksPublications"
import { TasksCollection } from '../imports/api/TasksCollection';
import "../imports/api/TasksMethods"
const SEED_USERNAME = 'geovana';
const SEED_PASSWORD = 'password';

const insertTask = (taskText) =>
  TasksCollection.insertAsync({ texto: taskText, data: '10:00', usuario: 'Geovana',descricao: null });

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Lavar Louca",
    ].forEach(insertTask);
  }
  
});

