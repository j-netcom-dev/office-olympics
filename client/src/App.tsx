import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { PublicLayout, RegisterPage } from './pages/public';

const App =() =>{

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element ={<PublicLayout />}>
          <Route index element ={<RegisterPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
