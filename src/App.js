import logo from './logo.svg';
import TimeProvider from './Contexts/TimeContext';
import './App.css';
import ScheduleComponent from './Components/ScheduleComponent';
import VizComponent from './Components/VizView';
import ReportComponent from './Components/ReportComponent';
import { Menu } from 'antd';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router basename="/">
      <TimeProvider>
        <div className="App">
          <div className="app-container">
            <div className="sidebar">
              <h2>Time reporter</h2>
              <Menu mode="inline"
              style={{height:"100%"}}>
                <Menu.Item key="1">
                  <Link to={"/"}>Home</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={"/schedule"}>Schedule</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={"/report"}>Report time worked</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={"/viz"}>Visualizations</Link>
                </Menu.Item>
              </Menu>
              {/* <nav>
                <ul>
                  <li>

                  </li>
                  <li>

                  </li>
                  <li>

                  </li>
                  <li>

                  </li>
                </ul>
              </nav> */}
            </div>
            <div className="main-content">
              <Switch>
                <Route path={"/schedule"}>
                  <ScheduleComponent />
                </Route>
                <Route path={"/viz"}>
                  <VizComponent />
                </Route>
                <Route path={"/report"}>
                  <ReportComponent />
                </Route>
                <Route path={"/"}>
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
