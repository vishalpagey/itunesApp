import React, {useState,useRef } from 'react';
import './Album.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleFav } from '../../actions/albumAction';
import { useDispatch } from 'react-redux';


const Album = (props) =>{
const listItem = useRef()
const dispatch = useDispatch()
 const {album} = props
  const [isExpanded,setExpanded] = useState(false)
  const [height,setHeight] = useState(0)


  const handleFav = (e) =>{
    e.stopPropagation()
    dispatch(toggleFav(album.position))
  }
   const handleToggle=(e)=> {
        e.preventDefault();
        setExpanded((prevState)=>!prevState)
        setHeight(listItem.current.clientHeight)
    }; 

        //Setting the current height of the element
        const currentHeight = isExpanded ? height : 0;

        return (
            <li className={`panel ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="panel__header" onClick={(e) => handleToggle(e)}>
                    <span className={'header__rank'}>#{album.position}</span>
                    <img className={'header__img'} src={album['im:image'][2].label} alt="" />
                    <div className="header__album">
                        <h2 className={'album__name'}>{album['im:name'].label}</h2>
                        <h3 className={'album__artist'}>{album['im:artist'].label}</h3>
                    </div>
                    <FontAwesomeIcon className={'header__arrow'} icon={'angle-down'} />
                   {album.isFavourite? <FontAwesomeIcon className={'star-checked'} icon={"star"} onClick={(e)=>handleFav(e)}/> : <FontAwesomeIcon className={'star'} icon={'star'} onClick={(e)=>handleFav(e)}/>}
                </div>
                <div className="panel__collapse" style={{ height: currentHeight }}>
                    <div className="collapse__body" ref={listItem}>
                        <div className={'body__info'}>
                            <div className={'info__element'}>
                                <span className={'element__data'}>{album.category.attributes.term}</span>
                                <span className={'element__title'}>Category</span>
                            </div>
                            <div className={'info__element'}>
                                <span className={'element__data'}>{album['im:releaseDate'].attributes.label}</span>
                                <span className={'element__title'}>Release date</span>
                            </div>
                            <div className={'info__element'}>
                                <span className={'element__data'}>{album['im:price'].label}</span>
                                <span className={'element__title'}>Price</span>
                            </div>
                        </div>
                        <div className={`body__links ${isExpanded ? 'is-expanded' : ''}`}>
                            <div className={'links__link'}>
                                <a className={'links__link--a'} href={album.link.attributes.href} target={'_blank'} rel={'noopener noreferrer'}>Check out on
                                    iTunes</a>
                            </div>
                            <div className={'links__link'}>
                                <a className={'links__link--a'} href={album.category.attributes.scheme} target={'_blank'} rel={'noopener noreferrer'}>More artists in
                                this
                                    category</a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    
}

export default Album; 