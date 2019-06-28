import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    
};

class FirebaseService {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    /* Firebase APIs */
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    /* Social Sign In Method Provider */
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doSignInWithGoogle = async onLoggin => {
    const { user } = await this.auth.signInWithPopup(this.googleProvider);

    if (user) {
      const token = await user.getIdToken(true);
      this.getUser(user.email).set({
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        roles: {},
        token,
        points: 50
      });

      onLoggin && onLoggin(user);
    }
  };

  getUsers = () => this.db.collection('users');

  getUser = email => this.getUsers().doc(email);

  getProducts = () => this.db.collection('products');

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = onAuthChange =>
    this.auth.onAuthStateChanged(
      authUser => onAuthChange && onAuthChange(authUser)
    );
}

export default new FirebaseService();
