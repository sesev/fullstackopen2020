import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomAnecdote = (list) => (
  Math.floor(Math.random()*list.length)
)


const AnecdotePage = ({anecdotes, votes}) => (
  <p><i>{anecdotes}</i><br/><br/>Has been voted {votes} times!</p>
)


const App = (props) => {
  const [selected, setSelected] = useState(randomAnecdote(props.anecdotes))
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(selected)
  
  
const handleNextAnecdote = () => {
    setSelected(randomAnecdote(props.anecdotes))
  }
  
const handleVoteAnecdote = () => {
  const copyVotes = [...votes]
  copyVotes[selected] += 1
  console.log()
  setVotes(copyVotes)

  if (copyVotes[selected]>copyVotes[mostVotes]) {
    setMostVotes(selected)
  }


}


  return (
    <div>
      <h1>Random anecdote for the day:</h1>
      <AnecdotePage anecdotes={props.anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleVoteAnecdote}>Vote this anecdote!</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <h1>Most voted anecdote:</h1>
      <AnecdotePage anecdotes={props.anecdotes[mostVotes]} votes={votes[mostVotes]}/>


        </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)