import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './layout/layout';
import { Menu } from './pages/menu'
import { PageEstoque } from './pages/estoque'
import { PageLancamento} from './pages/lancamento'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Menu />} />

            <Route path='/lancamento' element={<PageLancamento />}/>
            <Route path='/estoque' element={<PageEstoque />} /> 
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
