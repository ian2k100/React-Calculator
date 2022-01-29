import React,{useState} from 'react';
import { evaluate } from 'mathjs'

function App() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    const ops = ['÷', 'x', '+', '-', '.', '='];

    const updateCalc = (value) => {
        // this if statement prevents you from adding in loads of ops and using the ops first before a number 
        if (
            (ops.includes(value) && calc === '') 
                            || 
            (ops.includes(value) && ops.includes(calc.slice(-1))
            )
        ){
            return;
        }
        setCalc(calc + value);

        if (!ops.includes(value)){
            setResult(evaluate(calc + value));
        }
    }

    const createDigits = () => {
        const digits = [];

        for (let i=1; i < 10; i++){
            digits.push(
                <button 
                    onClick={() => updateCalc(i.toString())}
                    key={i}>
                    {i}
                </button>
            )
        }
        return digits;
    }

    const Calculate = () => {
        setCalc(evaluate(calc));
    }

    const deleteLast = () => {
        if (calc == ''){
            return;
        }

        const value = calc.slice(0, -1);
        setCalc(value)

    
    }

  return (
    <div className="App">
      <div className="React Calculator">
        <div className="display">
           {result ? <span>({result})</span> : '' } 
           {calc || "0" } 
        </div>

        <div className="operators">
            <button onClick={() => updateCalc('÷')}>÷</button>
            <button onClick={() => updateCalc('x')}>x</button>
            <button onClick={() => updateCalc('+')}>+</button>
            <button onClick={() => updateCalc('-')}>-</button>

            <button onClick={deleteLast}>AC</button>
        </div>
        <div className='digits'>
            { createDigits() }
            <button onClick={() => updateCalc('0')}>0</button>
            <button onClick={() => updateCalc('.')}>.</button>
            <button onClick={Calculate}>=</button>
        </div>
      </ div>
    </div>
  );
}

export default App;