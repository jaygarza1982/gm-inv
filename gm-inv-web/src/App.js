import './App.css';
import ItemInput from './components/ItemInput';
import {Switch, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/item-modify/:apiKey/:itemName'>
          <Layout>
            <ItemInput />
          </Layout>
        </Route>
        <Route path='/item-list/:apiKey'>
          <Layout>
            <ItemList />
          </Layout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
