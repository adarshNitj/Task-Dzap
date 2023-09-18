import React from 'react'
import { useState } from 'react'
import Button from './Button'
import '../css/DisperseForm.css'

const DisperseForm = () => {
  //  var keepData , CombinData;
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [lines, setLines] = useState([]);
  const [ObjData, setObjData] = useState()

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText.trim() === ' ') {
      setError('Input cannot be empty');
      setLines([]);
    } else {


      const regex = /^[0-9]+$/; 

      const linesArray = inputText.split('\n');

      let wrongAmountArray = []; 

      const objs = [{}]; 

      for(let i =0 ; i<linesArray.length;i++){
        const keyValueArray = linesArray[i].split(/[=, ]+/); 

        if(!regex.test(keyValueArray[1])){
            wrongAmountArray.push(i+1);  
        }else{
            const newObj = {
                Address:keyValueArray[0],
                Amount:keyValueArray[1], 
                lineNumber: i+1
            }
          objs.push(newObj)
        }
      }

      let err = wrongAmountArray.join(',')

 const DupLineNumbers = DuplicateLineNumbers(objs); 
     if(wrongAmountArray.length>0&&DupLineNumbers.length>1)
     {
       setError(`Line ${err} Wrong Amount and ${'\n'} ${DupLineNumbers} `)
     }else if(DupLineNumbers.length>1)
       {
        setError(DupLineNumbers);
       }else if(wrongAmountArray.length>0)
       {
        setError(`Line ${err} Wrong Amount` )
       } 
   
     // Keep Change and Combine Wala Call Ho toh setLines 
  
     setObjData(objs)
      // CombinData = SumOccrances(objs); 

    }
  };



function DuplicateLineNumbers(objs){

  const lineNumbersByAddress = {};
  for (const item of objs) {
    const address = item.Address;
    const lineNumber = item.lineNumber;
  
    if (!lineNumbersByAddress[address]) {
      lineNumbersByAddress[address] = [];
    }
    lineNumbersByAddress[address].push(lineNumber);
  }
  const addressesWithMultipleLineNumbers = Object.keys(lineNumbersByAddress).filter(
    (address) => lineNumbersByAddress[address].length > 1
  );
  let res = ""; 
  for (const address of addressesWithMultipleLineNumbers) {
    let str =  `${address} Line ${lineNumbersByAddress[address].join(',')}`;
    res += `${str}\n`
  } 
  return res;
  }

  function SumOccrances(result){
    const sums = {};

      for (const item of result) {
        if (sums.hasOwnProperty(item.Address)) {
          sums[item.Address] = parseInt(sums[item.Address])+parseInt(item.Amount)
          
        } else {
          sums[item.Address] = item.Amount;
        }
      }
      result = Object.keys(sums).map((Address) => ({
        Address,
        Amount: sums[Address],
      }));

      return result; 
    }
  

  function keepFirstOccurrence(array, property) {
    const uniqueObjects = [];
    const seenValues = new Set();
  
    for (const item of array) {

      const value = item[property];
      
      if (!seenValues.has(value)) {
        seenValues.add(value);
        uniqueObjects.push(item);
      }
    }
    return uniqueObjects;
  }


 const handleKeep = (e) =>{
  e.preventDefault(); 
  const keepData = keepFirstOccurrence(ObjData, "Address"); 
  setLines(keepData.map(obj=>`${obj.Address}  ${obj.Amount}`)); 

  }
  const handleCombine = (e) =>{
  e.preventDefault(); 
  const CombinData = SumOccrances(ObjData); 
  setLines(CombinData.map(obj => `${obj.Address}  ${obj.Amount}`)); 
  }

  return (
    <div className='disperseForm'>
        <form onSubmit={handleSubmit}>
          
           <div className='disperseForm_input'>
             <label>Addresses and Amount</label>
             <textarea   
              value={inputText}
              onChange={handleInputChange} 
              id='address_amount'
              placeholder="Enter Addresses and Amounts"></textarea>
           </div>
          
           <div className='disperseForm_output'>
             <p>Seperated by ',' or ' ' or '='</p>
           </div>
           <Button type="submit" text="Next" color="blue"/>
           
        </form>
       

        {error && (
            <>
              <button onClick={handleKeep}>Keeps</button>
              <button onClick={handleCombine}>Combine</button>
              <div className='error_box'>
                <p style={{ color: 'red' }}>{error}</p>
             </div>
             </>
             )
         }

        { lines.length > 0 && (
         <div>
          <h3>Lines:</h3>
          <ol>
            {lines.map((line, index) => (
              index===0?"":
              <li key={index}>{line}</li>
            ))}
          </ol>
         </div>)}

         {

         }

    </div>
  )
}

export default DisperseForm


