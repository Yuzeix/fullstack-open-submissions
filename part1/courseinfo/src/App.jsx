const Header = ({ course }) => { 
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
        <Part partName={parts[0].name} excerciseCount={parts[0].exercises}/>
        <Part partName={parts[1].name} excerciseCount={parts[1].exercises}/>
        <Part partName={parts[2].name} excerciseCount={parts[2].exercises}/>
    </div>        
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return <p>Number of exercises {totalExercises}</p> 
}

const Part = ({ partName, excerciseCount }) => {
  return (
    <p>
      {partName} {excerciseCount}
   </p>
  )
} 

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10 
    },
    {
      name: 'Using props to pass data',
      exercises: 7 
    },
    {
      name: 'State of a component',
      exercises: 14 
    }
  ]


  return (
    <div>
      <Header course={course}/>
      <Content 
        parts={parts}
      />
      <Total 
        parts={parts} 
      />
    </div>
  )
}

export default App


