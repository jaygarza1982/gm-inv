import './App.css';
import ItemInput from './components/ItemInput';
import {Switch, Route } from 'react-router-dom';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/item-modify/:apiKey/:itemName' component={ItemInput} />
        <Route path='/item-list/:apiKey' component={ItemList} />
      </Switch>
    </div>
  );
}

export default App;
