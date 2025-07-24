import './App.css'
import Background from './components/Background/Background.tsx'
import Auth from './pages/Auth/Auth.tsx'

function App() {

  return (
      <div className='app relative'>
        <Background color1='#081633' color2='#102D69'/>
        
        <div className='absolute top-0 z-1 w-full h-full'>
          <Auth />
        </div>
        
      </div>
  )
}

export default App
