import { useState } from 'react'

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
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {totalClick}</p>
        <p>Average {averageClick}</p>
        <p>Positive {positivePercentage} %</p>
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

      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

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