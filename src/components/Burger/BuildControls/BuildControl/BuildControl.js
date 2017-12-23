import React from 'react'
import classes from './BuildControl.css'

const buildControl = ( props ) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removed} disabled={props.ingrCount < 1}>Less</button>
    <button className={classes.More} onClick={props.added} disabled={props.ingrCount > 2}>More</button>
  </div>
)
export default buildControl