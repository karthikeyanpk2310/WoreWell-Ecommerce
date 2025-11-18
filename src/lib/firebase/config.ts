'use client';

// NOTE: Add your Firebase app configuration here
const firebaseConfig = {
  apiKey: 'AIzaSyCHb8s9s_Xwj3xbF4RX9l5OJHxdZwJJN4U',
  authDomain: 'wore-well.firebaseapp.com',
  projectId: 'wore-well',
  storageBucket: 'wore-well.appspot.com',
  messagingSenderId: '1061928557352',
  appId: '1:1061928557352:web:a2628439268f036718d728',
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
