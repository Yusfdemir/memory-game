import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
export const gameSlice=createSlice({
    name:"memoryGame",
    initialState:{
        cardImages:[
            { "src": '/img/helmet-1.png', matched:false},
            { "src": '/img/potion-1.png', matched:false},
            { "src": '/img/ring-1.png', matched:false},
            { "src": '/img/scroll-1.png', matched:false},
            { "src": '/img/shield-1.png', matched:false},
            { "src": '/img/sword-1.png', matched:false}, 
        ],
        cards:[],
        turns:0,
        choiceOne:null,
        choiceTwo:null,
        disabled:false,
        point:0,
        highScore: localStorage.getItem("h-score") || 0,
    },
    reducers:{
        shuffleCard:(state,action)=>{
            const shuffledCards=[...state.cardImages, ...state.cardImages].sort(()=>Math.random() - 0.5)
            .map(card=>({...card, id:nanoid()}))
            if(state.point > state.highScore){
                localStorage.setItem("h-score",state.point)
            }
            state.choiceOne=null;
            state.choiceTwo=null;
            state.cards=shuffledCards;
            state.highScore=localStorage.getItem("h-score")
            state.turns=0;
            state.point=0 
        },
        handleChoice:{
            reducer:(state,action)=>{
                    state.choiceOne ? state.choiceTwo=action.payload : state.choiceOne=action.payload
            },
            prepare:(card)=>{
                return {payload:card}
            }   
        },
        resetTurn:(state,action)=>{
            state.choiceOne=null;
            state.choiceTwo=null;
            state.turns+=1;
            state.disabled=false; 
 
        },
        matchCards:(state,action)=>{
            const newCards= state.cards.map((card)=>{
                if(card.src === state.choiceOne.src){
                    return{...card,matched:true}   
                }else{
                    return card
                }
            })
            state.cards=newCards
        },
        handleClick:{
            reducer:(state,action)=>{
                
                if(!state.disabled){
                    const card=action.payload
                    handleChoice(state,card) 
                }
            },
            prepare:({card})=>{
                return {payload:{card}}
            }
        },
        setDisabledTrue:(state)=>{
            state.disabled=true
        },
        setDisabledFalse:(state)=>{
            state.disabled=false
        },
        increasePoint:(state)=>{
            state.point+=50
           
        },
        decreasePoint:(state)=>{
            state.point-=10
        }
    }

})


export const {shuffleCard,resetTurn,matchCards,handleClick,setDisabledTrue,setDisabledFalse,handleChoice,increasePoint,decreasePoint}=gameSlice.actions
export default gameSlice.reducer