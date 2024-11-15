import React from 'react';

const Country = ({ id, name, handleShowButton, country }) => {
    
  return( 
  <div>
  <li>{name}<button onClick={() => handleShowButton(country)}>Show</button></li> 
  
  </div>
  ) 
};

export default Country;