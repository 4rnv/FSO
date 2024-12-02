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
    <strong>Total Exercises {total.reduce((sum, num) => sum + num)}</strong>
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

export default Course