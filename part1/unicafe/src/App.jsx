import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const StatisticLine = ({ text, value, simbol }) => {
  return (
    <p>
      {text} {value} {simbol}
    </p>
  )

}


const Statistics = ({ good, neutral, bad, totalClick, averageClick, positivePercentage }) => { 
  if (totalClick === 0) {
    return (
    <div>
      <h1>statistics</h1>
      <p>no feedback given</p>
    </div>
    )
  }
    return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good:" value={good}/>
      <StatisticLine text="neutral:" value={neutral}/>
      <StatisticLine text="bad:" value={bad}/>
      <StatisticLine text="all:" value={totalClick}/>
      <StatisticLine text="average:" value={averageClick}/>
      <StatisticLine text="positive:" value={positivePercentage} simbol="%"/>
    </div>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood (good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral (neutral + 1)
  }

  const handleBadClick = () => {
    setBad (bad + 1)
  }

  const totalClick = good + neutral + bad;

  const averageClick = (good - bad) / totalClick;

  const positivePercentage = (good / totalClick) *100;
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      totalClick={totalClick}
      averageClick={averageClick}
      positivePercentage={positivePercentage}
      />
    </div>
  )
}

export default App