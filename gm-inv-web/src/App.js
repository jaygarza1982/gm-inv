import './App.css';
import ItemInput from './components/ItemInput';
import {Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/:apiKey/:itemName' component={ItemInput} />
      </Switch>
    </div>
  );
}

export default App;
