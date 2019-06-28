import React, { Component } from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import { Header } from '../Header';

import firebase from '../../firebase.service';
import { SessionProvider } from '../SessionProvider';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      initializing: true
    }

  }
  
  componentDidMount() {
    firebase.onAuthUserListener(async (authUser) => {
      if(authUser) {
        const userRef = await firebase.getUser(authUser.email);
        userRef.onSnapshot((snapshot) => {
          const user = snapshot.data();
          this.setState({ user, initializing: false })
        })
      } else {
        this.setState({ user: null, initializing: false })
      }   
    })
  }

  render() {
    const { user, initializing } = this.state;

    return (
      <SessionProvider value={{ user, initializing }}> 
        <GithubCorner />
        <Header style={{ margin: '0 80px'}}/>
        <main>
          <Filter />
          <Shelf />
        </main>
        <FloatCart />
      </SessionProvider>
    );
  }
}

export default App;
