import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import "../imports/api/TasksPublications"
import { TasksCollection } from '../imports/api/TasksCollection';
import "../imports/api/TasksMethods"
import { _ } from 'meteor/underscore';
import  '../imports/api/UsersPublications'
import '../imports/api/UsersMethods'
import '../imports/api/PhotosMethods';
const SEED_USERNAME = 'userPadrao';
const SEED_PASSWORD = 'password';



const insertTask = (taskText) =>
  TasksCollection.insertAsync({ texto: taskText, data: '10:00', usuario: 'Geovana',descricao: null });

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      profile: {name: '', birthDate: '', sex: '',companyName: '',avatarPhoto:''},
      email: '',
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


// Object.assing combina dois objetos
Accounts.onCreateUser((options, user) => {

  const customizedUser = Object.assign(
    {
      
    },
    user
  );
  
  
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    customizedUser.profile = options.profile;
  }

  return customizedUser;
});