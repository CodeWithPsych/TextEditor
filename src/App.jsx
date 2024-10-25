import './App.css';
import  { useState } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.classList.add('dark-mode');
      showAlert("Dark mode is enabled", "success");
    } else {
      setMode('light');
      document.body.classList.remove('dark-mode');
      showAlert("Light mode is enabled", "success");
    }
  };

  return (
    <>
      <Navbar title="Text Editer"  mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <TextForm showAlert={showAlert} text="Enter your text here" mode={mode} />
    </>
  );
}

export default App;
