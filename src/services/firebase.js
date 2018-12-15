import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import prodConfig from '../../config.json';
import devConfig from '../../config-dev.json';
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default firebase.initializeApp(config.firebaseConfig);
