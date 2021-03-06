import React, { Component } from 'react';
import '../../style.css';

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

    buscar(event){
        if(this.state.url === ''){
            this.setState({arquivos:[], erro: 'O Repositório do git precisa ser informado!'})
        }else{
            let urlApi = 'https://repo-rpb.herokuapp.com/repo/git';
            
            let result = fetch(urlApi, {
                method: 'PUT',
                body: JSON.stringify({url: this.state.url}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                if(!res.ok){
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => {
                this.setState({arquivos: json, erro: ''})
            })
            .catch(e => { 
                this.setState({arquivos: [] ,erro: 'Não foi possível encontrar o repositório informado. Verifique se a URL está correta.'});
                console.log(e);
              });
        }

        event.preventDefault();
        this.setState({ url: '' });
    }

    render(){
        return(
            <div>
                {this.state.erro && <p className='error'>{this.state.erro}</p>}
                <form onSubmit={this.buscar} className='form'>
                    <label className='label'>Url Repositório do git: </label>
                    <input type="url" name="url" value={this.state.url} placeholder='https://github.com/user/repository'
                        onChange={(e) => this.setState({url: e.target.value})} className='input'/>
                    <button type="submit" className='button'> Pesquisar Arquivos</button>
                </form>
                
                <div style={{display: this.state.arquivos !== 'undefined' && this.state.arquivos.length > 0  ? 'block' : 'none' }}>
                    <table className='customers'>
                        <tr>
                            <th>Arquivo</th>
                            <th>Quantidade de Linhas</th>
                            <th>Tamanho (bytes)</th>
                        </tr>
                        {
                            this.state.arquivos !== 'undefined' && this.state.arquivos.length > 0
                            && this.state.arquivos.map((item, key) => {
                                return(
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.quantityLines}</td>
                                        <td>{item.size}</td>
                                    </tr>
                                );})

                            // this.state.arquivos !== 'undefined' && this.state.arquivos.length > 0
                            // && this.state.arquivos.map((item, key) => {
                            //     return(
                            //         <article key={key} className='list'>
                            //             <strong>Arquivo: {item.name}</strong><br/>
                            //             <strong>{item.quantityLines} linhas</strong><br/>
                            //             <strong>{item.size} bytes</strong>
                            //         </article>
                            //     );})
                        }
                    </table>
                </div>
            </div>
        );
    }
}

export default Repository;