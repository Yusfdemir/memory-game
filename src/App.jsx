import { useEffect, useState } from 'react'
import "./App.css"
import CardItem from './components/CardItem'
import { useSelector,useDispatch } from 'react-redux'
import { shuffleCard,handleChoice,resetTurn,matchCards,setDisabledFalse,setDisabledTrue, increasePoint, decreasePoint } from './redux/GameSlice'

function App() {
  const dispatch=useDispatch()
  const {cards,cardImages,choiceOne,choiceTwo,turns,disabled,point,highScore}=useSelector(state=>state.memoryGame)
  
  console.log(highScore)
  // compare 2 selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      dispatch(setDisabledTrue())
      if(choiceOne.src === choiceTwo.src){
        dispatch(matchCards())
        dispatch(increasePoint())
        dispatch(resetTurn())
      }else{
        setTimeout(()=>{
          dispatch(resetTurn())
          dispatch(decreasePoint())
        },1000)
        
      }
    }
  },[choiceOne,choiceTwo])

  useEffect(()=>{
    dispatch(shuffleCard())
  },[])

  return (
    <div className='App'>
      <h3>Magic Match</h3>
      <div className='point-area'>
        <p>Turns:{turns}</p>
        <p>Point:{point}</p>
        {highScore>0 &&<p>High Score:{highScore}</p>}
      </div>
      <button onClick={()=>{
          dispatch(shuffleCard())
      }}>New Game</button>
      <div className="card-grid">
        {cards.map((card)=>(
          <CardItem 
            key={card.id} 
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      
    </div>
  )
}

export default App
