import React, { Component } from 'react'
import Repository from './components/repository/repository';

class App extends Component{
  constructor(props){
    super(props);
    this.state = { }
  }

  render(){
    return (
      <div>
          <h1 className='titulo'>Informe o repositório para consulta!</h1>
          <hr/>
          <Repository />
      </div>
    );
  }
}


export default App;
