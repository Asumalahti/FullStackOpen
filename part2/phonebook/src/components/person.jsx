import React from 'react';

const Person = ({ id, name, number,removePerson }) => {
    
  return <li>
    {name} {number}
    <button onClick={()=>removePerson(id)}>Delete</button>
  </li>
          
};

export default Person;