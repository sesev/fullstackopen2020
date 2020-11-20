import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) =>{
  return(
      <h1>{course.name}</h1>
  )
}

const Part = ({course}) => {
  return (
    <div>{course.parts.map(part =>
    <Part key={parts.id} part={part}/>)}
      </div>
  )
}
const Content = ({course}) => {
  return (
    <div>
      <p>{course.part}</p>
    </div>
  )
}

const Total = (course) => {
  return (
    <p>
      Total number of excercises:  
    </p>
  )
}

const Course = ({course}) =>{
  console.log(course)
  return(
      <div>
        <Header course={course}/>
        <Part course={course}/>
      </div>
  )
}



const App = () => {

  const course = [
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
      ]
    }
  ]
  
  return (
    <div><ul>
      {course.map(course =>
      <Course key={course.id} course={course}/> )}
    </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))