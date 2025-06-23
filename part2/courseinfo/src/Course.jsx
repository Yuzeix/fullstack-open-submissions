
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

  export default Course