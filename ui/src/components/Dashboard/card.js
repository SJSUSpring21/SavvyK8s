import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function MediaCard(props) {
  return (
    <Card className={props.className} style={{width: 'auto'}}>
      <CardActionArea>
        <CardContent>
          <Typography className="text-white" style={{ fontSize: '2rem'}} gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="h5" className="text-white" component="h2">
            {props.subheader}
          </Typography>
          <Typography variant="body2" className="text-white" component="p">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
