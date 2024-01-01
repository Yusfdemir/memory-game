import React from 'react'
import "./CardItem.css"
import { useDispatch,useSelector } from 'react-redux'
import { handleChoice } from '../redux/GameSlice'



const CardItem = ({card,flipped,disabled}) => {
    const dispatch=useDispatch()
    const handleClick=()=>{
        if(!disabled){
           dispatch(handleChoice(card))
        }   
    }
    
  return (
    <div  className='card'>
        <div className={flipped ? "flipped" : "" }>
            <img src={card.src} className='front'  alt="card-front"/>
            <img 
                src="/img/cover.png" 
                className='back' 
                onClick={handleClick} 
                alt="card-back"
            />
        </div>
  </div>
  )
}

export default CardItem