import logo from './logo.svg';
import TimeProvider from './Contexts/TimeContext';
import './App.css';
import ScheduleComponent from './Components/ScheduleComponent';
import VizComponent from './Components/VizView';
import ReportComponent from './Components/ReportComponent';
import tasks from './Data/tasks'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <TimeProvider>
        <div className="App">
          <div className="app-container">
            <div className="sidebar">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/schedule">Schedule</Link>
                  </li>
                  <li>
                    <Link to="/report">Report time worked</Link>
                  </li>
                  <li>
                    <Link to="/viz">Visualizations</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="main-content">
              <Switch>
                <Route path="/schedule">
                  <ScheduleComponent />
                </Route>
                <Route path="/viz">
                  <VizComponent />
                </Route>
                <Route path="/report">
                  <ReportComponent />
                </Route>
                <Route path="/">
                  <ScheduleComponent /> {/*If we create a landing page, this should lead there*/}
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </TimeProvider>
    </Router>
  );
}

export default App;
