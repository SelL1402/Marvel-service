import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';
import AppBanner from '../appBanner/AppBanner';
import { Helmet } from "react-helmet";
const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState("");
    const {loading, error, getCharacter, clearError} = useMarvelService();
    
    useEffect(()=>{
        updateChar();
    }, [charId])
    
    const updateChar = () =>{
        clearError();
        console.log(char)
        getCharacter(charId)
            .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> :null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail,} = char;
    
    return(
        <>
            <Helmet>
                <meta
                name="description"
                content={`${name} character comics`}
                />
                <title>{name}</title>
            </Helmet>
            <AppBanner/>
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleCharPage;