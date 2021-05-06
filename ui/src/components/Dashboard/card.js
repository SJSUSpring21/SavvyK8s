import React from 'react';
export default function Card(props) {
  return (
    <div className="card" style={{color: 'white', width:'28rem'}}>
      <div class="card-body" className={props.className}>
        <h5 class="card-title text-white" style={{ fontSize: '3rem', fontWeight:'bold', padding:'1rem'}}>{props.title}</h5>
        <p class="card-text" style={{ fontSize: '1.5rem' , padding:'1em'}}>{props.content}</p>
      </div>
    </div>

  );
}
