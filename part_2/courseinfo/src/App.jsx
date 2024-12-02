const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course_name}</h1>
  )
}

const Part = (props) => {
  console.log(props.part)
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = ({course}) => {
  console.log(course)
  return (
  <div>
    {course['parts'].map(c => <Part key={c.id} part={c.name} exercises={c.exercises}/>)}
  </div>
  )
}

const Total = ({course}) => {
  const total = course['parts'].map(c => c.exercises)
  return (
    <p>Total Exercises {total.reduce((sum, num) => sum + num)}</p>
  )
}

const Course = ({course}) => {
  return (
    <>
    <Header course_name={course.name}/>
    <Content course={course}/>
    <Total course={course}/>
    </>
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
        name: 'Styling',
        exercises: 3,
        id: 4
      }
    ]
  }
  return <Course course={course} />
}

export default App