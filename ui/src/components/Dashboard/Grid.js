import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MediaCard from './card.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NestedGrid() {
  const cards=[
  {
    'title':'Card1',
    'subheader':'This is  Card1',
    'content':"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    'className':"bg-primary", 
  },
  {
    'title':'Card2',
    'subheader':'This is  Card2',
    'content':"Where does it come from?Contrary to popular belief, Lorem Ipsum is not simply random tex ",
    'className':"bg-warning",
  },
  {
    'title':'Card3',
    'subheader':'This is  Card3',
    'content':"Why do we use it?It is a long established fact that a reader will be distracted ",
    'className':"bg-danger",
  },
  {
    'title':'Card4',
    'subheader':'This is  Card4',
    'content':"Where can I get some?There are many variations of passages of Lorem Ipsum available",
    'className':"bg-info",
  }

  ]
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {cards.map(card=>(
          <Grid container item xs={3} spacing={3}>
            <MediaCard title={card.title} subheader={card.subheader} content={card.content} className={card.className}/>
          </Grid>
          ))}
      </Grid>
    </div>
  );
}
