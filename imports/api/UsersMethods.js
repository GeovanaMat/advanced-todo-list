
import {Meteor} from  'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'user.updateProfile'(profile){
        console.log(profile)
        return Meteor.users.updateAsync(this.userId, {
            $set : {
                profile: profile,
            }
        })
    },
    'user.createUser'(username, password){
        if(Accounts.findUserByUsername(username)){
            return Accounts.createUserAsync({
                username: username,
                password: password,
                profile: {name: '', birthDate: '', sex: '',companyName: '',avatarPhoto:''},
              }, 
            );
        }
        else{
            throw new Meteor.Error('bad','Usuário já existe');
        }
        
        
    }
});