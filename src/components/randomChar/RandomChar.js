import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { CSSTransition } from 'react-transition-group';
import setContent from '../../utils/setContent';

const RandomChar = () => {

    const [char, setChar] = useState("");
    const [showChar, setShowChar] = useState(true);

    const { getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(()=>{
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () =>{
        setShowChar(false);
        clearError();
        const id  = Math.floor(Math.random() * (1011400  - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'))
        setShowChar(true);
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}
const View = ({data, show}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = {'objectFit' : 'contain'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'contain'};
    }
    return(
        <CSSTransition
            in={show}
            classNames="randomchar__block"
            timeout={1000}>
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description ? description : 'No information about this hero'}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default RandomChar;