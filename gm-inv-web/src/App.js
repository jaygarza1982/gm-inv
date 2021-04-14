import './App.css';
import ItemInput from './components/ItemInput';
import {Switch, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import Layout from './components/Layout';
import QRPage from './components/QRPage';

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
        <Route path='/qr-page/:apiKey?'>
          <Layout>
            <QRPage />
          </Layout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
