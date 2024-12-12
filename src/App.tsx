import './App.css'
import Button from './components/Button';

function App() {


  return (
    <>
      <Button label='按钮' onClick={() => {console.log("click!!!")}} variant='secondary'/>
    </>
  )
}

export default App
