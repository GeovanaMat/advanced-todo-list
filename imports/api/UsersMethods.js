
import {Meteor} from  'meteor/meteor';

Meteor.methods({

    'user.updateProfile'(newInfoUser){
        const {birthDate, profile, sex, companyName, avatarPhoto} = newInfoUser;
        return Meteor.users.updateAsync(this.userId, {
            $set : {
                birthDate: birthDate,
                profile: profile,
                sex: sex,
                companyName: companyName,
                avatarPhoto: avatarPhoto,
            }
        })
    }
});