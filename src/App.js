import './App.css';
import Landing from './components/landing';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Details from './components/details';
import Posts from './components/posts';


function App() {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<Landing/>}>
                </Route>
                <Route path='/landing'  element={<Landing/>}>                
                </Route>
                <Route path='/details'  element={<Details/>}>                
                </Route>
                <Route path='/posts'  element={<Posts/>}>                
                </Route>
            </Routes>
        </Router>
  );
}

export default App;
