import React, { Fragment } from 'react'
//import { Container } from 'react-bootstrap';
import NavWel from "../components/Nav-Welcome"

//src="../img/Logo.jpg"
//Will fix when properly hosted (probably)

const Welcome = () => {
  return (
    <Fragment>
      <NavWel />
      <link rel="style" href="../App.css" />
      <div>Welcome</div>
      <img src="../img/Logo.jpg" class="WelcomeLogo" alt="Logo" />
      <h1>Welcome to Elephant Ears!</h1>

      <div>
        <h4>Become a better musician</h4>
        <p>Ever heard of the phrase “Play it by ear”? This amazing skill is achieved through ear training and it is in fact one of the most sought after skills in a person’s repertoire. A person who consistently trains this music skill will increase by leaps and bounds.</p>
      </div>
      <div>
        <h4>How we do it</h4>
        <p>We will serve you a campaign and adjust it based off of your needs using your performance data and inputting it into an advanced algorithm. The campaign will dynamically change automatically so you don’t have to worry about keeping up with your mastery of each skill.</p>
      </div>
      <div>
        <h4>Who we are</h4>
        <p>Created by a team of college musicians from various backgrounds and skill levels to ensure you get the best user experience.</p>
      </div>
    </Fragment>
  )
}

export default Welcome;