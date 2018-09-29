import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import '../assets/reset.css';
import '../assets/styles.css';

import HeaderBar from './header-bar/HeaderBar';
import Detail from './detail/Detail';

import Api from '../services/api';
import { search, setFavorite, filterFavorite } from '../services/helpers';

library.add(faStroopwafel)




export default class App extends React.Component {

    constructor (props) {
        super(props)

        this.api = Api();
        this.state = { vagas: []}       
        this.historyData = []; 
    }


    componentDidMount() {

        this.getData();

       this.searchSubscription = search.subscribe( term => {
            const { vagas } = this.state;
            const result = this.filterByTerm(term, vagas);
            this.setState({vagas: result})
        })

        this.favoriteSubscription =  setFavorite.subscribe( value => this.setFavorite(value));
        this.filterFavoriteSubscriptions = filterFavorite.subscribe( value => this.selectFavorite(value));

    }

    componentWillUnmount () {
        this.favoriteSubscriptio.unsubscribe()
        this.filterFavoriteSubscriptions.unsubscribe()
    }

    setHistoryData () {
        const { vagas } = this.state;
        return vagas;
    }

    filterByTerm (term, data) {

        const reg = new RegExp(term, 'ig');

        if (this.hasValidResult(term, data)) {

            return data.filter( item => {
                if (reg.test(item.name)) return item
            });    
            
        }

        return this.historyData;
    }


    hasValidResult (term, data) {

        const reg = new RegExp(term, 'ig');

        if (term.length >= 3) {

            return data.some( item => {
                return reg.test(item.name)
            })

        }

        return false;
    }

    getData() {

        this.api.getData()
        .then( response => {
            this.setState({vagas: response.data})
            this.historyData = this.setHistoryData();
        })
        .catch( e => console.log(e))
    }

    setFavorite ( favorito ) {

       this.historyData = this.historyData.map( item => {
           if (item._id === favorito._id) {
             item.isFavorite = favorito.status;
           }
           return item;
       })
       
       this.setState({vagas: this.historyData});

    }

    selectFavorite (status) { 

        if (!status) {
            this.setState({vagas: this.historyData});
            return;
        }

        const favorites = this.historyData.filter( item => {
            if (item.isFavorite === true) return item;
        })
        
        if (!favorites.length) return;

        this.setState({vagas: favorites});

     }
    

    render() {

        const { vagas } = this.state;
        return (
            <div>
                <HeaderBar />                 
                {vagas.map( vaga => <Detail key={vaga._id} vaga={vaga} /> )}
            </div>
        );
    }
}