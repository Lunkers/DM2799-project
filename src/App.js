import logo from './logo.svg';
import TimeProvider from './Contexts/TimeContext';
import './App.css';
import ScheduleComponent from './Components/ScheduleComponent';
import tasks from './Data/tasks'

function App() {

  return (
    <TimeProvider>
      <div className="App">
        <header className="App-header">
          <p>
            IVIS time reporting.
        </p>
        </header>
        <ScheduleComponent />
      </div>
    </TimeProvider>
  );
}

export default App;
