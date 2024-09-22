import React ,{useState} from 'react'

export default function Textform(props) {
  const handleUpClick = ()=>{
    // console.log("uppercase was clicked" + text);
    let newText = text.toUpperCase();
    // let MewText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","Success");
    // setText(MewText);
  }
  const handleCopy =() =>{
      let text = document.getElementById("mybox");
      text.select();
      navigator.clipboard.writeText(text.value);
      props.showAlert("Texr are copied","Success");
  }

  const handleExtraSpace =()=>{
   let newText = text.split(/[ ]+/);
   setText(newText.join(" "));
   props.showAlert("Extra spaces are removed","Success");

  }
  const handleresetClick =()=>{
    let newText = '';
    setText(newText);
    props.showAlert("text is reset","Success");
  }
  const handleDownClick =() =>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase","Success");
  }
  const handleOnChange =(event)=>{
    // console.log("hello");
    saveToHistory(text); // Save current state before changing
    clearRedoStack();   
    setText(event.target.value);
  }
  const saveToHistory = (currentText) => {
    setHistory([...history, currentText]);
  };

  // Clear the redo stack
  const clearRedoStack = () => {
    setRedoStack([]);
  };

  // Handle Undo operation
  const handleUndo = () => {
    if (history.length === 0) return; 
    const lastState = history[history.length - 1];
    setRedoStack([text, ...redoStack]);
    setText(lastState);
    setHistory(history.slice(0, -1));
  };

  // Handle Redo operation
  const handleRedo = () => {
    if (redoStack.length === 0) return; // No action to redo

    // Get the last state from redo stack
    const redoState = redoStack[0];
    
    // Move the current state to history
    saveToHistory(text);

    // Update the text and redo stack
    setText(redoState);
    setRedoStack(redoStack.slice(1));
  };
  const [text, setText] = useState("enter text here");
  const [history, setHistory] = useState("");
  const [redoStack, setRedoStack] = useState("");
  return (
   <>
<div className="container" style={{color:props.mode === 'dark'?'white':'black'}}>

    <h1>{props.heading}</h1>
    <div className="mb-3">
  <label htmlFor="textarea" className="form-label"></label>
  <textarea className="form-control" value={text} onChange={handleOnChange} id="mybox" rows="7"  style={{
          backgroundColor:props.backgroundColor,
          color:props.mode === 'dark' ? 'white' : 'black',
        }}
        ></textarea>
 </div>
<button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to uppercase</button>
<button className="btn btn-primary mx-2" onClick={handleDownClick}>Convert to lowercase</button>
<button className="btn btn-primary mx-2" onClick={handleresetClick}>Reset</button>
<button className="btn btn-primary mx-2" onClick={handleUndo}  disabled={history.length === 0}>Undo</button>
<button className="btn btn-primary mx-2" onClick={handleRedo} disabled={redoStack.length === 0}>Redo</button>
<button className="btn btn-primary mx-2" onClick={handleCopy}>Copy</button>
<button className="btn btn-primary mx-2" onClick={handleExtraSpace}>Remove extraspace</button>
</div>
<div className="container my-3" style={{color:props.mode === 'dark'?'white':'black'}}>
 <h1>your summary</h1>
 <p>Words-{text.trim() ===""? 0 :text.trim().split(/\s+/).length} Length-{text.replace(/\s+/g,'').length}</p>
 <p>Speed-{0.008 * text.split(" ").length}</p>
 <h2>Preview</h2>
 <p>{text.length>0?text:"Enter your text to preview it here"}</p>
 
</div>
  </>
  )
}
// text.trim() ===""? 0 :text.trim().split(/\s+/).length
