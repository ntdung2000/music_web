import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { onAuthStateChanged } from 'firebase/auth';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './assets/styles/global.css';
import './theme/variables.css';
import { useContext, useEffect, useState } from 'react';
import ProfilePage from './pages/profile';
import HomeLayout from './layouts/homeLayout';
import ListPage from './pages/list';
import SearchPage from './pages/search';
import { IonReactRouter } from '@ionic/react-router';
import { getAppAuth } from './config/firebase';
import AddMusicPage from './pages/addMusic';

setupIonicReact();

const App: React.FC = () => {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    onAuthStateChanged(getAppAuth, (user) => {
      setIsLogin(user? true : false)
    })
  })

  return (
    <IonApp>
      <IonReactRouter>
          <Route 
            path="/"
            render={() => {
              return (
                isLogin ?
                <HomeLayout>
                  <Route path="/list" render={() => <ListPage />} />
                  <Route path="/search" render={() => <SearchPage />} />
                  <Route path="/add-music" render={() => <AddMusicPage />} />
                  <Redirect to="/list" />
                </HomeLayout> :
                <Redirect to="/login" /> 
              )
            }}
          />   
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/register" render={() => <RegisterPage />} />
          <Route 
            path="/profile"
            render={() => {
              return (
                isLogin ?
                <ProfilePage /> :
                <Redirect to="/login" /> 
              )
            }}
          />
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
