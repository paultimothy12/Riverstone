import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Specificproduct() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/specificproduct/${inputValue}`)
  };

  return (
    <div className="SpecificProd" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>

    <div className="Prod">
        <div>
            <label>Enter ProductID:</label>
            <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <button type="button" name="submit" onClick={handleSubmit}>search</button>
        </div>
    </div>
    </div>
  );
}

export default Specificproduct;
