import React from 'react'
import "./CardItem.css"
const CardItem = ({card,handleChoice}) => {
    const handleClick=()=>{
        handleChoice(card)
    }
  return (
    <div  className='card'>
        <div>
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