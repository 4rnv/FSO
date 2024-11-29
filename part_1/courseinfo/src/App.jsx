const Header = (course_name) => {
  return (
    <h1>{course_name.course_name}</h1>
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
    <Part part={props.courses[0].part_name} exercises={props.courses[0].exercises} />
    <Part part={props.courses[1].part_name} exercises={props.courses[1].exercises} />
    <Part part={props.courses[2].part_name} exercises={props.courses[2].exercises} />
  </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  
  const course_array = [
    {part_name: "Fundamentals of React", exercises: 10},
    {part_name: "Using props to pass data", exercises: 7},
    {part_name: "State of a component", exercises: 14}
  ]

  return (
    <div>
      <Header course_name={course}/>
      <Content courses={course_array}/>
      <Total exercises1={course_array[0].exercises}  exercises2={course_array[1].exercises}  exercises3={course_array[2].exercises}/>
    </div>
  )
}

export default App