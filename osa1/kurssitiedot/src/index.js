import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
    return(
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return(
      <div>
      <p>{props.part1} {props.exercises1}</p>
      <p>{props.part2} {props.exercises2}</p>
      <p>{props.part3} {props.exercises3}</p>
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part part1={part1} exercises1={exercises1} />
        <Part part2={part2} exercises2={exercises2} />
        <Part part3={part3} exercises3={exercises3} />
      </div>
    )
  }

  const Total = (props) => {
    return(
      <p>Course has total of {props.amount} exercises.</p>
    )
  }

  
  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total amount={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))