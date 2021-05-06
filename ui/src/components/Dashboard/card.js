import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    minWidth: 150,
  },
});
export default function Card(props) {
  const classes = useStyles();
  return (
    <div className={`${classes.root} card`} style={{color: 'white'}}>
      <div class="card-body" className={props.className}>
        <h5 class="card-title text-white" style={{ fontSize: '3rem', fontWeight:'bold', padding:'1rem'}}>{props.title}</h5>
        <p class="card-text" style={{ fontSize: '1.5rem' , padding:'1em'}}>{props.content}</p>
      </div>
    </div>

  );
}
