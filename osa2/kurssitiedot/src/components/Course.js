import React from 'react'

const Header = ({course}) =>{
    return(
        <h1>{course.name}</h1>
    )
  }
  
  const Part = ( {parts} ) => {
    return (
      <div><ul><li><b>{parts.name}</b>: {" "} {parts.exercises} exercises</li></ul></div>
    )
  }
  const Content = ({course}) => {
    return (
      <div>{course.parts.map(parts =>
      <Part key={parts.id} parts={parts}/> ) }
        </div>
    )
  }
  
  const Total = ({ course }) => {
    const summa = course.parts.reduce((summa, part) => 
     summa + part.exercises, 0)
    return(
      <p><b>Course has {summa} exercises.</b></p>
    ) 
  }
  
  const Course = ({course}) =>{
    console.log(course)
    return(
        <div>
          <Header course={course}/>
          <Content course={course}/>
          <Total course={course}/>
        </div>
    )
  }

  
export default Course