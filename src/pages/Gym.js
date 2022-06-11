import React, { Fragment } from 'react'
import {Intervals, Chords, Perfect_Pitch} from '../exercises/toneFunctions';

const Gym = () => {
  return (
    <Fragment>
      <div>Gym</div>
      <button class="btn btn-primary" onClick={Intervals}>Intervals</button>
      <button class="btn btn-primary" onClick={Chords}>Chords</button>
      <button class="btn btn-primary" onClick={Perfect_Pitch}>Perfect Pitch</button>
    </Fragment>
  )
}

export default Gym;