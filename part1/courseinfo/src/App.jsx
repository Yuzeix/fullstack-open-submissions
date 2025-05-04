const Header = ({ course }) => { 
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
        <Part partName={parts[0].name} exerciseCount={parts[0].exercises}/>
        <Part partName={parts[1].name} exerciseCount={parts[1].exercises}/>
        <Part partName={parts[2].name} exerciseCount={parts[2].exercises}/>
    </div>        
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return <p>Number of exercises {totalExercises}</p> 
}

const Part = ({ partName, exerciseCount }) => {
  return (
    <p>
      {partName} {exerciseCount}
   </p>
  )
} 

const App = () => {
  const course = {
    name: 'Half Stack application development',

    parts: [
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
}


  return (
    <div>
      <Header course={course.name}/>
      <Content 
        parts={course.parts}
      />
      <Total 
        parts={course.parts} 
      />
    </div>
  )
}

export default App


