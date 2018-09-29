import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { setFavorite } from '../../services/helpers';

import './detail.css';


export default class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isToggleOn: false, 
            isFavorite: false,
            data: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.setFavorite = this.setFavorite.bind(this);
    }



    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    createHTML(text) {
        return { __html: text }
    }

    changeToggle() {
        const { isToggleOn } = this.state;
        return isToggleOn === true ? 'card__detail is--active' : 'card__detail';
    }

    isFavorited() {
        const { isFavorite } = this.state;
        return isFavorite === true ? 'card__detail__icon__favorite is--active' : 'card__detail__icon__favorite';
    }

    changeIcon() {
        const { isToggleOn } = this.state;
        return isToggleOn === true ? faAngleUp : faAngleDown;
    }

    setFavorite ()  { 
        
        const { vaga } = this.props;
        const props = Object.keys(vaga);
        const isFavorite = props.some( item => item === 'isFavorite' ? true : false);
        const item = {_id: vaga._id, status:null};
        
        if (!isFavorite) {
            vaga.isFavorite = true;
            this.setState({ isFavorite: vaga.isFavorite})
            item.status = vaga.isFavorite;
            setFavorite.next(item);
            return;
        }

        vaga.isFavorite = vaga.isFavorite === true ? false : true;    
        this.setState({ isFavorite: vaga.isFavorite})  
        item.status = vaga.isFavorite;
        setFavorite.next(item);
    }


    render() {


        const activeState = this.changeToggle();
        const typeIcon = this.changeIcon();
        const isFavorited = this.isFavorited();
        
        const { name, description } = this.props.vaga;

        return (
            <div className="container card__detail__container has--limit_with">
                <div className={activeState}>
                    <div className="card__detail__header">
                        <h2 className="card__detail__title">{name}</h2>
                        <FontAwesomeIcon icon={faStar} className={isFavorited} onClick={this.setFavorite}/>
                    </div>
                    <div className="card__detail__control" onClick={this.handleClick}>
                        <FontAwesomeIcon icon={typeIcon} />
                    </div>
                    <div className="card__detail__content" dangerouslySetInnerHTML={this.createHTML(description)}></div>
                </div>
            </div>
        )
    }
}