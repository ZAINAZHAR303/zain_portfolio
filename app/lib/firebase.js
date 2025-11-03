import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCGYkqDFIky97JjhbuSs-vNpNZmUMjRQs4',
  authDomain: 'game-690c4.firebaseapp.com',
  databaseURL: 'https://game-690c4.firebaseio.com',
  projectId: 'game-690c4',
  storageBucket: 'game-690c4.firebasestorage.app',
  messagingSenderId: '211271645376',
  appId: '1:211271645376:web:b3d37b5982cc44a7bc5525',
  measurementId: 'G-0JMSFW7SR0'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
