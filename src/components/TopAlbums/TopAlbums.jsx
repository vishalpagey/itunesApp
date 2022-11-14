import React, { useEffect, useState } from 'react';
import './TopAlbums.scss';
import Album from "../Album/Album";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from "../../actions/albumAction";
import Dropdown from 'react-dropdown';
import Switch from "react-switch";
import 'react-dropdown/style.css';
const TopAlbums = () => {
    const [search, setSearch] = useState('')
    const [selectedCategory, setselectedCategory] = useState({label:'All',value:''})
    const [onlyFavourites,setOnlyFavourites] = useState(false)
    const dispatch = useDispatch()
    const albums = useSelector(state => state.albums)
    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch])
    const categoryOptions = [{label:"All",value:''}]
    categoryOptions.push(...Array.from(new Set(albums.items.map(album => album.category.attributes.term))))
    const handleChange = (event) => {
        setSearch(event.target.value)
    };
    const filteredAlbums = albums.items.filter(
        (album) => {
            return (album['im:name'].label.toLowerCase().includes(search.toLowerCase()) || album['im:artist'].label.toLowerCase().includes(search.toLowerCase())) && album['category'].attributes.term.includes(selectedCategory.value) && (onlyFavourites ? album.isFavourite : true)
        }
    );
    return (
        <main className={'topAlbums'}>
            <form className={'topAlbums__searchBox'}>
                <input className={'searchBox__input'} type="text" placeholder="Search"
                    value={search}
                    onChange={(e) => handleChange(e)} />
                <FontAwesomeIcon icon={'search'} className={'searchBox__icon'} />
            </form>
            <div className={'filters'}>
                <div className={'categories'}>
                    <span>Categories:</span>
                    <Dropdown style={{ minWidth: '150px' }} options={categoryOptions} onChange={(e) => setselectedCategory(e)} value={selectedCategory.label} placeholder="Select an option" />
                </div>
                <div className={'favourites'}>
                    <span>Favourites:</span>
                    <Switch onChange={()=> setOnlyFavourites(prevState=>!prevState)} checked={onlyFavourites} />
                </div>
            </div>

            {filteredAlbums.length ? <ul className={'topAlbums__list'}>
                {filteredAlbums.map((element, index) => {
                    return <Album key={index} album={element} />
                })}
            </ul>:<h1>Nothing to show.</h1>}
           
        </main>
    )
}



export default TopAlbums; 