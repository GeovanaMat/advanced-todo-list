
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
        if(!(Meteor.users.findOneAsync({_id: username}))){
            return Accounts.createUserAsync({
                username: username,
                password: password,
                profile: {name: '', birthDate: '', sex: '',companyName: '',avatarPhoto:''},
                email: '',
              });
        }
        
    }
});