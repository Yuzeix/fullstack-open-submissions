
const Total = ({ totalEx }) => {
  return (
    <p>Total Exercises is {totalEx}</p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
   </p>
  )
} 

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => { 
        return <Part key={part.id} part={part}/>
        })}
  </div>
  )     
}

const Header = ({ courseName }) => { 
  return (
    <h1>{courseName}</h1>
  )
}

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total totalEx={totalExercises}/>
    </div>
  )
}

const App = () => {
  
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Hooks',
        exercises: 7,
        id: 4
      },
      {
        name: 'Database operations',
        exercises: 9,
        id: 5
      }
    ]
  }
  return <Course course={course} />
}

export default App


