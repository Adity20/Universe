import React from 'react'
import '../css/about.css'

export default function About() {
  return (
    <div id="container">
  <div id="contain-left">
    <h1>A team of Three enthusiasts</h1>
    <h2>
      We call ourselves <u>JAY</u>-den
    </h2>
    <div className="names">
      <h3 id="name1">1. Jatin Yadav</h3>
      <h3 id="name2">2. Adil Khan</h3>
      <h3 id="name3">3. Yashswi Shukla</h3>
    </div>
    <div className="info">
      <p id="paragraph">
        You are probably wondering why our team name is JAY-den,
        <br />
        Actually the word JAY is made up of our initials,
        <br />
        there was a character named Jayden so we decided to keep this as our
        team name.
      </p>
    </div>
  </div>
  <div id="contain-right">
    <div className="img">
      <img id="Image" src="./img/Jayden.jpg" alt="" />
    </div>
  </div>
</div>
  )
}
