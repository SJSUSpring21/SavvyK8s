import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './card.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function BasicGrid() {
  const cards=[
  {
    'title':'Card1',
    'content':"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    'className':"bg-primary", 
  },
  {
    'title':'Card2',
    'content':"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    'className':"bg-warning",
  },
  {
    'title':'Card3',
    'content':"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    'className':"bg-danger",
  },
  {
    'title':'Card4',
    'content':"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    'className':"bg-info",
  }

  ]
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        {cards.map(card=>(
          <Grid item xs={3}>
            <Card title={card.title} content={card.content} className={card.className}/>
          </Grid>
          ))}
      </Grid>
    </div>
  );
}
