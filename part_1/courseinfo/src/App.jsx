const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course_name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
  <div>
    <Part part={props.course['parts'][0].part_name} exercises={props.course['parts'][0].exercises} />
    <Part part={props.course['parts'][1].part_name} exercises={props.course['parts'][1].exercises} />
    <Part part={props.course['parts'][2].part_name} exercises={props.course['parts'][2].exercises} />
  </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.course['parts'][0].exercises+props.course['parts'][1].exercises+props.course['parts'][2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {part_name: "Fundamentals of React", exercises: 10},
      {part_name: "Using props to pass data", exercises: 7},
      {part_name: "State of a component", exercises: 14}
    ]
  }

  return (
    <div>
      <Header course_name={course.name}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App