
import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'; 
import './styles.css';

export default class main extends Component {

    state = { // Função que mostra tudo aqui que deve ser ouvido pela função 'render' e local de armazenação de dados 

        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount(){ // Métodos executados assim que o componente é mostrado em tela

        this.loadProducts()
    }

    loadProducts = async (page = 1) => { // Função assíncrona executando a requisição do servidor definido

        const response = await api.get(`/products?page=${page}`)

        const { docs, ...productInfo } = response.data

        this.setState({ products: docs, productInfo, page }) // Passa a informação para o método 'state'
    }

    prevPage = () => {

        const { page, productInfo } = this.state

        if(page === 1) return;

        const pageNumber = page - 1

        this.loadProducts(pageNumber)
    }

    nextPage = () => {

        const { page, productInfo } = this.state

        if(page === productInfo.pages) return;

        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }        

    render(){ // Renderiza a página executando a lógica definida dentro dela e também exibe sempre as atualizações sofridas dentro da função 'state'

    const { products, page, productInfo } = this.state;

        return (

            <div className='product-list'>

                {products.map( product => (

                    <article key={product._id}>

                        <strong>{product.title}</strong>

                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                    ))
                }

                <div className='actions'>

                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>

            </div>
        )
    }
}
