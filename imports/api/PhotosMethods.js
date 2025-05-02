import { Meteor } from 'meteor/meteor';
import { Fotos } from './PhotosCollection.js';
import { check } from 'meteor/check';
Meteor.methods({
  'photos.insert'(base64Image) {
    check(base64Image, String); // validação básica
    Fotos.insertAsync({
      imagemBase64: base64Image,
      createdAt: new Date()
    });
  }
});

