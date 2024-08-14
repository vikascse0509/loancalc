import { useState } from 'react'
import './App.css'

function App() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [totalInterest, setTotalInterest] = useState('')
  const [error, setError] = useState('')

  const loanCalculator = () => {
    const loanAmountNum = parseFloat(loanAmount);
    const interestRateNum = parseFloat(interestRate);
    const loanTermNum = parseFloat(loanTerm);
  
    if (isNaN(loanAmountNum) || isNaN(interestRateNum) || isNaN(loanTermNum)) {
      setError("Please enter valid values for the given inputs!");
      setMonthlyPayment(null);
      setTotalInterest(null);
      return;
    }
  
    setError('');
  
    const monthlyInterest = interestRateNum / 100 / 12;
    const totalPayment = loanTermNum;
    const calculatedMonthlyPayment = (loanAmountNum * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayment));
    const calculatedTotalInterest = (calculatedMonthlyPayment * totalPayment) - loanAmountNum;
  
    setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
    setTotalInterest(calculatedTotalInterest.toFixed(2));
  };
  
  return (
    <>
      <div className='max-w-[500px] mx-auto my-[100px]'>
        <div className='bg-[#fff] px-10 py-2.5 border border-solid border-[#ccc rounded-[8px]'>
          <h1 className='text-[28px] font-bold text-center'>Loan Calculator</h1>
          <div className='m-[15px]'>
            <label className='flex flex-col mb-[5px]' htmlFor="">Loan Amount :</label>
            <input value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className='w-[100%] p-[8px] border border-solid border-[#ccc]' type="number" placeholder='Enter the amount' required/>
          </div>
          <div className='m-[15px]'>
            <label className='flex flex-col mb-[5px]' htmlFor="">Interest Rate (%) :</label>
            <input value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className='w-[100%] p-[8px] border border-solid border-[#ccc]' type="number" placeholder='Enter rate of interest'/>
          </div>
          <div className='m-[15px]'>
            <label className='flex flex-col mb-[5px]' htmlFor="">Loan Term :</label>
            <input value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className='w-[100%] p-[8px] border border-solid border-[#ccc]' type="number" placeholder='Enter the term' required/>
          </div>
          <button onClick={loanCalculator} className='flex mx-auto my-0 px-5 py-2.5 bg-[green] rounded-[8px] text-white font-bold'>Calculate</button>
          <div className='mt-[20px] p-[10px] bg-[#f9f9f9] border border-solid border-[#ccc] rounded-[4px]'>Final Result
          {error && <p className="error">{error}</p>}
          {monthlyPayment && <p><strong>Monthly payment: {monthlyPayment}</strong></p>}
          {totalInterest && <p><strong>Total Interest: {totalInterest}</strong></p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
