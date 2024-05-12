import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';
import AppBanner from '../appBanner/AppBanner';
import { Helmet } from "react-helmet";
import setContent from '../../utils/setContent';
const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState("");
    const {getCharacter, clearError, process, setProcess} = useMarvelService();
    
    useEffect(()=>{
        updateChar();
    }, [charId])
    
    const updateChar = () =>{
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'))
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail,} = data;
    
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
                    <p className="single-comic__descr">{description ? description : 'There is no description about this character'}</p>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleCharPage;