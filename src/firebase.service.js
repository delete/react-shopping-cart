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
      const userRef = await this.getUser(user.email)
      
      const userDoc = await userRef.get();
      if(!userDoc.exists) {
        userRef.set({
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          roles: {},
          token,
          points: 0
        });
      }
      onLoggin && onLoggin(user);
    }
  };

  getUsers = () => this.db.collection('users');

  getUser = email => this.getUsers().doc(email);

  getProducts = () => this.db.collection('products');
  
  getProduct = id => this.getProducts().doc(id);
  
  createProduct = (payload) => this.getProducts().add(payload);

  getPayments = () => this.db.collection('payments');

  createPayment = (payload) => this.getPayments().add(payload);

  getTransations = () => this.db.collection('transactions');

  createTransaction = (payload) => this.getTransations().add(payload);

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = onAuthChange =>
    this.auth.onAuthStateChanged(
      authUser => onAuthChange && onAuthChange(authUser)
    );
}

export default new FirebaseService();
