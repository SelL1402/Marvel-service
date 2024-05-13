import { useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charlist, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    

    const { getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(()=> setProcess('confirmed'))
    }
    const onCharListLoaded = (newcharList) => {
        let ended = false;
        if(newcharList.length < 9){
            ended = true;
        }
        setCharList(charList => [...charList, ...newcharList]);
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }
    function renderItems(arr){
        
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition
                    classNames="char__item"
                    timeout={500}
                    key={item.id}>
                    <li
                        className='char__item'
                        key={i}
                        tabIndex={0}
                        onClick={() => props.onCharSelected(item.id)}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className='char__name'>{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className='char__grid'>
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    const elements = useMemo(()=>{
        return  setContent(process, () => renderItems(charlist), newItemLoading)
    }, [process])
    
    return (
        <div className='char__list'>
            {elements}
            <button 
                className='button button__main button__long'
                disabled={newItemLoading}
                style={{'display' : charEnded ? 'none' : 'block'}}
                onClick={()=> onRequest(offset)}>
                <div className='inner'>load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected : PropTypes.func.isRequired
}

export default CharList;