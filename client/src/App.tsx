import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { PublicLayout, RegisterPage } from './pages/public';
import { Dashboard, LeaderBoard, ProtectedLayout } from './pages/protected';
import { AdminLayout, Competitions, Players } from './pages/admin';

const App =() =>{

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<ProtectedLayout />}>
          <Route index element ={<Dashboard />}/>
          <Route path='leaderboard' element ={<LeaderBoard />}/>
        </Route>
        <Route path='/register' element ={<PublicLayout />}>
          <Route index element ={<RegisterPage />}/>
        </Route>
        <Route path='/admin' element ={<AdminLayout />}>
          <Route index element ={<Competitions />}/>
          <Route path='players' element ={<Players />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
