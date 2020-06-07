import React from 'react'

const Header = (props) => (
    <h3>{props.course.name}</h3>

)


const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)


const Content = (props) =>{
  const parts = props.course.parts.map(x => <Part key={x.id} part = {x} />)

  return(
    <div>
      {parts}
    </div>
  )
}


const Total = (props) => {
  const nums = props.course.parts.map(x => x.exercises)
  return(
  <p>Number of exercises {nums.reduce((a, b) => a + b, 0)}</p>
  )
}


const Courses = ({courses}) => {

  const courselist = courses.map(x =>
    <div key={x.id}>
      <Header course = {x}/>
      <Content course = {x}/>
      <b><Total course = {x}/></b>
    </div>
    )
    
  return(
  <>
    <h1> Curriculum </h1>
    <div> {courselist} </div>
  </>
    
  )
}


export default Courses