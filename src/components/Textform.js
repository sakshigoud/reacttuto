import React ,{useState} from 'react'

export default function Textform(props) {
  const handleUpClick = ()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","Success");
  }
  
  const handleCopy = () => {
    let text = document.getElementById("mybox");
      text.focus();
      if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text.value)
        .then(() => {
          props.showAlert("Text copied to clipboard", "Success");
        })
        .catch(err => {
          console.error("Failed to copy text: ", err);
          props.showAlert("Failed to copy text", "Error");
        });
    } else {
      try {
        text.setSelectionRange(0, text.value.length);  // Use setSelectionRange instead of select()
          document.execCommand("copy");
          document.getSelection().removeAllRanges();
          props.showAlert("Text copied to clipboard", "Success");
      } catch (err) {
        console.error("Fallback copy failed: ", err);
        props.showAlert("Failed to copy text", "Error");
      }
    }
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
    saveToHistory(text); 
    clearRedoStack();   
    setText(event.target.value);
  }
  const saveToHistory = (currentText) => {
    setHistory([...history, currentText]);
  };
  const clearRedoStack = () => {
    setRedoStack([]);
  };
  const handleUndo = () => {
    if (history.length === 0) return; 
    const lastState = history[history.length - 1];
    setRedoStack([text, ...redoStack]);
    setText(lastState);
    setHistory(history.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return; 
    const redoState = redoStack[0];
    saveToHistory(text);
    setText(redoState);
    setRedoStack(redoStack.slice(1));
  };
  const [text, setText] = useState("Enter text here");
  const [history, setHistory] = useState("");
  const [redoStack, setRedoStack] = useState("");
  return (
   <>
<div className="container" style={{color:props.mode === 'dark'?'white':'black'}}>

    <h1 className='mb-2'>{props.heading}</h1>
    <div className="mb-3">
  <label htmlFor="textarea" className="form-label"></label>
  <textarea className="form-control" value={text} onChange={handleOnChange} id="mybox" rows="7"  style={{
          backgroundColor:props.backgroundColor,
          color:props.mode === 'dark' ? 'white' : 'black',
        }}
        ></textarea>
 </div>
<button className="btn btn-primary mx-2 my-1" onClick={handleUpClick} disabled={text.length === 0}>Convert to uppercase</button>
<button className="btn btn-primary mx-2 my-1" onClick={handleDownClick} disabled={text.length === 0}>Convert to lowercase</button>
<button className="btn btn-primary mx-2 my-1" onClick={handleresetClick} disabled={text.length === 0}>Reset</button>
<button className="btn btn-primary mx-2 my-1" onClick={handleUndo}  disabled={history.length === 0}>Undo</button>
<button className="btn btn-primary mx-2 my-1" onClick={handleRedo} disabled={redoStack.length === 0}>Redo</button>
<button className="btn btn-primary mx-2 my-1" onClick={handleCopy} disabled={text.length === 0}>Copy</button>
<button className="btn btn-primary mx-2 my-1" onClick={handleExtraSpace} disabled={text.length === 0}>Remove extraspace</button>
</div>
<div className="container my-3" style={{color:props.mode === 'dark'?'white':'black'}}>
 <h1>your summary</h1>
 <p>{text.trim() ===""? 0 :text.trim().split(/\s+/).length}-Words and {text.replace(/\s+/g,'').length}-Characters</p>
 <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length}-Minutes read</p>
 <h2>Preview</h2>
 <p>{text.length>0?text:"Enter your text to preview it here"}</p>
 
</div>
  </>
  )
}
