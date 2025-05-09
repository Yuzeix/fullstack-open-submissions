
const Total = ({ totalEx }) => {
  return (
    <p>Total of {totalEx} exercises</p>
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
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  
  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total totalEx={totalExercises}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development curriculum</h1>
      {courses.map(course => {
        return <Course key={course.id} course={course}/>
      })} 
    </div>
  )
}

export default App


