import React, { Component } from 'react';

class Repository extends Component{
    constructor(props){
        super(props);
        this.state = { 
            arquivos: {name:'', quantityLines:'', size:'', extension:''},
            url: '',
            erro: '',
        }

        this.buscar = this.buscar.bind(this);
    }

    

    // buscar(event){
    //     if(this.state.url === ''){
    //         this.setState({erro: 'O Repositório do git precisa ser informado!'})
    //     }else{
    //         let urlApi = 'https://repo-rpb.herokuapp.com/repo/git';
    //         fetch(urlApi, {
    //             method: 'PUT',
    //             body: JSON.stringify({url: this.state.url}),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((json) => {
    //             this.setState({arquivos: json})
    //             // var array = Object.keys(json).map(i => JSON.parse(json[Number(i)]));
    //             // console.log('Array: ', array);

    //             // var array = Object.keys(json);
    //             // console.log('Array: ', array);

    //             var arrayValues = Object.values(json);
    //             console.log('Array: ', arrayValues);

    //             var map = new Array(),object = {};

    //             let arq = arrayValues.map(v=>{
    //                 map.push(v);
    //                 return v;
    //             })
    //             console.log('arq: ', arq);
    //             this.setState({arquivos: map})
    //             console.log('arquivos:', this.state.arquivos);
    //         });
    //     }

    //     event.preventDefault();
    // }

    buscar(event){
        if(this.state.url === ''){
            this.setState({erro: 'O Repositório do git precisa ser informado!'})
        }else{
            let urlApi = 'https://repo-rpb.herokuapp.com/repo/git';
            
            fetch(urlApi, {
                method: 'PUT',
                body: JSON.stringify({url: this.state.url}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.setState({arquivos: json})
                console.log(json);
            });
        }

        event.preventDefault();
    }

    // componentDidMount(){
    //     // const httpHandler = require('react-http-client');
    //     let urlApi = 'https://repo-rpb.herokuapp.com/repo/git';

    //     fetch(urlApi)
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((json) => {
    //         this.setState({arquivos: json})
    //     });
    // }

    render(){
        return(
            <div>
                {this.state.erro && <p>{this.state.erro}</p>}
                <form onSubmit={this.buscar}>
                    <label>Repositório do git: </label>
                    <input type="url" name="url" value={this.state.url}
                        onChange={(e) => this.setState({url: e.target.value})}/> <br/>
                    <button  type="submit"> Buscar </button>
                </form>

                {this.state.arquivos !== 'undefined' && this.state.arquivos.length > 0
                && this.state.arquivos.map(item => {
                    return(
                        <article>
                            <strong>Arquivo: {item.name}</strong><br/>
                            <strong>Quantidade de linhas: {item.quantityLines}</strong><br/>
                            <strong>Tamanho: {item.size} bytes</strong>
                            <hr/>

                        </article>
                    );})
                
                
                /* {this.state.arquivos !== 'undefined' && this.state.arquivos.length > 0
                 && this.state.arquivos.map(item => {
                  return(
                    <article>
                        <strong>{item}</strong>
                    </article>
                    );
                })} */
                }
                
            </div>
        );
    }
}

export default Repository;