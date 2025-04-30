import {Meteor} from 'meteor/meteor';


Meteor.publish('userData',function () {
    if (this.userId) {
        
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: { birthDate: 1, companyName: 1,profile:1,sex:1,avatarPhoto:1 },
        }
      );
    } else {
        
      this.ready();
    }
  }
);