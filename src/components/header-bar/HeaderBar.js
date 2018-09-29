import React from 'react';

import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './header-bar.css'
import  {search, filterFavorite}  from '../../services/helpers';
import userImage from '../../assets/images/user.png';


export default class HeaderBar extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            filterByFavorite: false
        }
        
        this.onSelectFavorite = this.onSelectFavorite.bind(this);
        this.isFavorited = this.isFavorited.bind(this);
    }


    onSearch (e) {
        search.next(e.target.value)
    }

    onSelectFavorite() { 

        if(this.state.filterByFavorite === false)  {
            this.setState({filterByFavorite: true})
            filterFavorite.next(!this.state.filterByFavorite);
        } else {
            this.setState({filterByFavorite: !this.state.filterByFavorite})
            filterFavorite.next(!this.state.filterByFavorite);
        }

    }

    isFavorited () {
        return this.state.filterByFavorite === false ? 'favorite__icon' : 'favorite__icon is--active';
    
    }





    render() {

        const isFavorited = this.isFavorited();

        return (
            <div className="container has--bottom_shadow has--gutter_bottom">
                <div className="header__bar">
                    <div className="header__logo"></div>
                    <div className="header__search">
                        <div className="header__group__search">
                            <input type="text" placeholder="Encontre uma vaga..." className="header__input__search" onChange={this.onSearch} />
                            <FontAwesomeIcon icon={faSearch} className="header__search__icon" />
                            <div className="header__favorite">
                                <div className="favorite__bar" onClick={this.onSelectFavorite}>
                                    <div className={isFavorited}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header__user__skin">
                        <img src={userImage} alt="logo" />
                    </div>
                </div>
            </div>
        );
    }
}