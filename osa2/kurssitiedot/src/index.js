import React from 'react'
import ReactDOM from 'react-dom'


const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Filosofian tohtori',
  greet: function() {
    console.log('hello, my name is', this.name)
  },
  doAddition: function(a, b) {    console.log(a + b)  },
}


arto.doAddition(1, 4)        // tulostuu 5

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)  // tulostuu 25

const Header = (props) =>{
  return(
      <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      Course part: {props.name}. {props.excercises} Excercises.</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} excercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} excercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} excercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Total number of excercises:  
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  )
}



const App = () => {

  const course = {
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

return (
  <div>
    <Course course={course} />
  </div>
)

  



}

ReactDOM.render(<App />, document.getElementById('root'))