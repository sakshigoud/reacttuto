import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Alert from './components/Alert';
import About from './components/About';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  const[mode,setMode] =useState('light');
  const[backgroundColor,setbackgroundColor] = useState('light');
  const[alert,setAlert] =useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
    setAlert(null);
    },1500);
   }
    const removeBodyClasses=()=>{
      document.body.style.remove(backgroundColor);
    }
   const toggleMode2 =()=>{
    if(mode === 'light'){
     setMode('dark');
     document.body.style.backgroundColor = "green";
    setbackgroundColor('green');
     showAlert("Green mode is enabled", "Success");
    }
    else{
     setMode('light');
     document.body.style.backgroundColor = "white";
     setbackgroundColor('white');
     showAlert("Light mode is enabled", "Success");

    }
  }
 const toggleMode1 =()=>{
   if(mode ==='light' ){
    setMode('dark');
    document.body.style.backgroundColor = "purple";
    setbackgroundColor('purple');
    showAlert("Purple mode is enabled", "Success");
   }
   else{
    setMode('light');
    document.body.style.backgroundColor = "white";
    setbackgroundColor('white');
    showAlert("Light mode is enabled", "Success");
   }
 }
  const toggleMode =() =>{
      if(mode === 'light'){
        setMode('dark');
        document.body.style.backgroundColor = "#052a60";
        setbackgroundColor('#052a60');
        showAlert("Dark mode is enabaled","Success");
        // document.title = 'Reacttuto -dark mode';
      }
      else{
        setMode('light');
        document.body.style.backgroundColor = "white";
        setbackgroundColor('white');
        showAlert("Light mode is enabaled","Success");
        // document.title = 'Reacttuto -light mode';
      }
    }
    return (
    <>
 <BrowserRouter>
      <Navbar title="TextUtils" mode ={mode} toggleMode={toggleMode} toggleMode1={toggleMode1} toggleMode2={toggleMode2} backgroundColor={backgroundColor} removeBodyClasses={removeBodyClasses}/>
      <Alert alert={alert}/>
      <div className="container my-3">   
        <Routes> 
          <Route path="/" element={
            <Textform heading = "Text analyser" mode ={mode} showAlert = {showAlert} backgroundColor={backgroundColor}/>
             } /> 
           <Route path="about" element={<About  mode={mode}/>} />
        </Routes>
      </div>
       </BrowserRouter> 
 </>
  );
}
export default App;
