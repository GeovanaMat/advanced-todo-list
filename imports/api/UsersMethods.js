
import {Meteor} from  'meteor/meteor';

Meteor.methods({
    'user.updateProfile'(profile){
        console.log(profile)
        return Meteor.users.updateAsync(this.userId, {
            $set : {
                profile: profile,
            }
        })
    }
});