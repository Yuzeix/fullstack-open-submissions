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
  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
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
        name: 'hooks',
        exercises: 6,
        id: 4
      }
    ]
  }
  return <Course course={course} />
}

export default App


