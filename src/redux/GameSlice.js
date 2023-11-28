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
        disabled:false
    },
    reducers:{
        shuffleCard:(state,action)=>{
            const shuffledCards=[...state.cardImages, ...state.cardImages].sort(()=>Math.random() - 0.5)
            .map(card=>({...card, id:nanoid()}))
            state.choiceOne=null;
            state.choiceTwo=null;
            state.cards=shuffledCards;
            state.turns=0;
        },
        // handleChoice:{
        //     reducer:(state,action)=>{
        //             console.log("aaa")
        //             console.log(action.payload)
        //             state.choiceOne ? state.choiceTwo=action.payload : state.choiceOne=action.payload
        //     },
        //     prepare:(card)=>{
        //         return {payload:{card}}
        //     }
            
        // },
        resetTurn:(state,action)=>{
            state.choiceOne=null;
            state.choiceTwo=null;
            state.turns+=1;
            state.disabled=false;   
        },
        matchCards:(state,action)=>{
            console.log("match")
            const newCards=state.cards.map(card=>{
                console.log(state.choiceOne)
                if(card.src === state.choiceOne.card.src){
                    console.log("eşleşti")
                    return {...card,matched:true}
                }
                else{
                    console.log(card)
                    return card
                }
            })
            console.log("newCards:",newCards)
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
    }

})
export const handleChoice=(state,card)=>{state.choiceOne ? state.choiceTwo=card : state.choiceOne=card }

export const {shuffleCard,resetTurn,matchCards,handleClick,setDisabledTrue,setDisabledFalse}=gameSlice.actions
export default gameSlice.reducer