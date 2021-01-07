import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar';

const App = props => {
  const { match } = props;
    return (
      <div>
        <Router>
          <div>
            <Navbar />
          </div>
        </Router>
      </div>
    );
  }


export default App;