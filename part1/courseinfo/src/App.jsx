const Header = ({ course }) => { 
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ part1, part2, part3 }) => {
  return (
    <div>
        <Part partName={part1.name} excerciseCount={part1.exercises}/>
        <Part partName={part2.name} excerciseCount={part2.exercises}/>
        <Part partName={part3.name} excerciseCount={part3.exercises}/>
    </div>        
  )
}

const Total = ({part1, part2, part3}) => {
  const totalExercises = part1.exercises + part2.exercises + part3.exercises
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

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10 
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7 
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14 
  }


  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1} 
        part2={part2}  
        part3={part3} 
      />
      <Total 
        part1={part1} 
        part2={part2}  
        part3={part3} 
      />
    </div>
  )
}

export default App


