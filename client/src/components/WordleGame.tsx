import { useState } from "react";
import WordleInterface from "./WordleInterface"

type HistoryEntry = {
    guess: string;
    accuracy: string[];
}

type GameState = {
    history: HistoryEntry[];
    guessNumber: number;
    guessesAllowed: number;
    secretWord: string;
    hasWon: boolean;
}

const CheckGuess = (guess: string) => {
    const [gameState, updateGameState] = useState<GameState>({
        guessesAllowed: 6,
        hasWon: false
    } as GameState);

    if(gameState.history.length >= gameState.guessesAllowed || gameState.hasWon) {
        return;
    }
    const history = gameState.history.slice(0, gameState.guessNumber-1);
    const target = gameState.secretWord;
    var accuracy = [];
    //Shorthand will be used for accuracy. Whitespace indicates absence of the corresponding character. X indicates presence but in a different location. O indicates presence in that location.
    for(var i=0; i<guess.length; i++) {
        switch(target.indexOf(guess[i])) { //For each character in guess, check if it's in the secret word.
            case -1: //If not, return whitespace.
                accuracy.push(' ');
                break;
            case i: //If it's in the same place it was in the guess, return O.
                accuracy.push('O');
                break;
            default://Otherwise, it has to be present but misplaced. Return X.
                accuracy.push('X');
                break;
        }
    }
    var victory = false;
    if(accuracy === ['O','O','O','O','O']){ //Checks if the player has won, and if so, sets the victory flag to true.
        victory = true;
    }
    updateGameState({
        history: history.concat({
            guess: guess,
            accuracy: accuracy,
        }),
        guessNumber: history.length,
        //guessesAllowed and secretWord are both constants. What's the ideal way to deal with these here?
        //guessesAllowed: this.props.guessesAllowed,
        //secretWord: this.props.secretWord,
        guessesAllowed: gameState.guessesAllowed,
        secretWord: gameState.secretWord,
        hasWon: victory,
    });

    return false;
}

/*
export class WordleGame extends React.Component {
    constructor(props: WordleInterface) {
        super(props);
        gameState = {
            history: [],
            guessNumber: 1,
            guessesAllowed: props.guessesAllowed,
            secretWord: props.secretWord,
            hasWon: false,
        };
    }

    checkGuess(guess: string) {
        if(gameState.history.length >= gameState.guessesAllowed || gameState.hasWon) {
            return;
        }
        const history = gameState.history.slice(0, gameState.guessNumber-1);
        const target = gameState.secretWord;
        var accuracy = [];
        //Shorthand will be used for accuracy. Whitespace indicates absence of the corresponding character. X indicates presence but in a different location. O indicates presence in that location.
        for(var i=0; i<guess.length; i++) {
            switch(target.indexOf(guess[i])) { //For each character in guess, check if it's in the secret word.
                case -1: //If not, return whitespace.
                    accuracy.push(' ');
                    break;
                case i: //If it's in the same place it was in the guess, return O.
                    accuracy.push('O');
                    break;
                default://Otherwise, it has to be present but misplaced. Return X.
                    accuracy.push('X');
                    break;
            }
        }
        var victory = false;
        if(accuracy === ['O','O','O','O','O']){ //Checks if the player has won, and if so, sets the victory flag to true.
            victory = true;
        }
        this.setState({
            history: history.concat([{
                guess: guess,
                accuracy: accuracy,
            }]),
            guessNumber: history.length,
            guessesAllowed: this.props.guessesAllowed,
            secretWord: this.props.secretWord,
            hasWon: victory,
        });
    }
}
*/
export const WordleGame = () => {
    return (
        <div>
            Wordle!



            <div id="msg"></div>
        </div>
    );
}
