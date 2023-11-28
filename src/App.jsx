import { useEffect, useState } from 'react'
import "./App.css"
import CardItem from './components/CardItem'
import { useSelector,useDispatch } from 'react-redux'
import { shuffleCard,resetTurn,matchCards,setDisabledFalse,setDisabledTrue } from './redux/GameSlice'

function App() {
  const dispatch=useDispatch()
  //const {cards,choiceOne,choiceTwo,turns,disabled}=useSelector(state=>state.memoryGame)
  
  //console.log(cards)
  const cardImages=[
    { "src": '/img/helmet-1.png', matched:false},
    { "src": '/img/potion-1.png', matched:false},
    { "src": '/img/ring-1.png', matched:false},
    { "src": '/img/scroll-1.png', matched:false},
    { "src": '/img/shield-1.png', matched:false},
    { "src": '/img/sword-1.png', matched:false},
    
  ]
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)
  const [disabled,setDisabled]=useState(false)
  //shuffle Card
  const shuffleCards=()=>{
    const shuffledCards=[...cardImages, ...cardImages].sort(()=>Math.random() - 0.5)
    .map(card=>({...card, id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  //handle a choice
  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  }
  // compare 2 selected cards

  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true)
      //dispatch(setDisabledTrue)
      
      if(choiceOne.src === choiceTwo.src){
        //if(choiceOne.card.src === choiceTwo.card.src)
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
        //dispatch(matchCards())
        //dispatch(resetTurn())
      }else{
        console.log("those cards do not match")
        setTimeout(()=>{
          resetTurn()
          //dispatch(resetTurn())
        },1000)
        
      }
    }
  },[choiceOne,choiceTwo])
  //reset choices and increase turn
  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn+1)
    setDisabled(false)
  }

  useEffect(()=>{
    shuffleCards()
    //dispatch(shuffleCard())
  },[])

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={()=>{
          //dispatch(shuffleCard())
          shuffleCards()
      }}>New Game</button>
      <div className="card-grid">
        {cards.map((card)=>(
          <CardItem 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  )
}

export default App
