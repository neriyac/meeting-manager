import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Styles
import './App.css'

// Pages & Components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Statistics from './pages/statistics/Statistics';
import Folders from './pages/folders/Folders';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';
import ProjectActive from './pages/project/ProjectActive';


function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar/>}
          <div className='container'>
            <Navbar/>
            <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login"/>}
              {user && <Dashboard/>}
            </Route>
            <Route path="/create">
              {!user && <Redirect to="/login"/>}
              {user && <Create/>}
            </Route>
            <Route path="/statistics">
              {!user && <Redirect to="/login"/>}
              {user && <Statistics/>}
            </Route>
            <Route path="/folders">
              {!user && <Redirect to="/login"/>}
              {user && <Folders/>}
            </Route>
            <Route path="/meetings/:id/active">
              {!user && <Redirect to="/login"/>}
              {user && <ProjectActive/>}
            </Route>
            <Route path="/meetings/:id">
              {!user && <Redirect to="/login"/>}
              {user && <Project/>}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/"/>}
              {!user && <Login/>}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/"/>}
              {!user && <Signup/>}
            </Route>
          </Switch>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
