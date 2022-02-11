import { useState } from "react";
import WordleInterface from "./WordleInterface"

enum LetterGuessState {
    Incorrect,
    Misplaced,
    Correct
}

type LetterGuess = {
    letter: string;
    position: number;
    state: LetterGuessState;
}

type HistoryEntry = {
    guess: string;
    accuracy: LetterGuess[];
}

type GameState = {
    history: HistoryEntry[];
    guessNumber: number;
    guessesAllowed: number;
    secretWord: string;
    hasWon: boolean;
}

const CheckGuess = (guess: string, gameState: GameState, updateGameState: any) => {

    const { guessesAllowed, hasWon, history, secretWord } = gameState;
    if(gameState.history.length >= gameState.guessesAllowed || gameState.hasWon) {
        return;
    }
    const target = gameState.secretWord;
    var accuracy: LetterGuess[];
    accuracy = [];
    //Shorthand will be used for accuracy. Whitespace indicates absence of the corresponding character. X indicates presence but in a different location. O indicates presence in that location.
    for(var i=0; i<guess.length; i++) {
        var tempAcc: LetterGuessState;
        switch(target.indexOf(guess[i])) { //For each character in guess, check if it's in the secret word.
            case -1: //If not, return whitespace.
                //accuracy.push(' ');
                tempAcc = LetterGuessState.Incorrect;
                break;
            case i: //If it's in the same place it was in the guess, return O.
                //accuracy.push('O');
                tempAcc = LetterGuessState.Correct;
                break;
            default://Otherwise, it has to be present but misplaced. Return X.
                //accuracy.push('X');
                tempAcc = LetterGuessState.Misplaced;
                break;
        }
        accuracy.push({letter: guess[i], position: i, state: tempAcc});
    }
    /*var victory = false;
    if(accuracy === ['O','O','O','O','O']){ //Checks if the player has won, and if so, sets the victory flag to true.
        victory = true;
    }*/
    var victory = true;
    accuracy.forEach(char => {if(char.state != LetterGuessState.Correct){ victory = false; }})
    updateGameState({
        history: history.concat({
            guess: guess,
            accuracy: accuracy,
        }),
        guessNumber: history.length,
        //guessesAllowed and secretWord are both constants. What's the ideal way to deal with these here? This approach doesn't throw any errors, at least, but it feels wrong.
        guessesAllowed: gameState.guessesAllowed,
        secretWord: gameState.secretWord,
        hasWon: victory,
    });
}

export const WordleGame = () => {
    const [guess, setGuess] = useState("")
    const [gameState, updateGameState] = useState<GameState>({
        history: [],
        guessNumber: 0,
        guessesAllowed: 6,
        secretWord: 'angry',
        hasWon: false
    } as GameState);

    const handleGuess = (event: any) => {
        event.preventDefault();
        CheckGuess(guess, gameState, updateGameState);
        setGuess('');
    }

    const renderHistory = (history: HistoryEntry[]) => {
        var out: string[];
        out = []
        history.forEach(entry => {
            out.push("Guess: "+entry.guess+". Accuracy: "+renderAccuracy(entry.accuracy));
        });
        return (
            <ol>
                {out.map((entry) => (
                    <li>{entry}</li>
                ))}
            </ol>
        );
    }

    const renderAccuracy = (accuracy: LetterGuess[]) => {
        var out = "";
        accuracy.forEach(char => {
            out = out.concat('The letter '+char.letter+' is ');
            switch(char.state) {
                case LetterGuessState.Incorrect: //If not, return whitespace.
                    out = out.concat('not present. ');
                    break;
                case LetterGuessState.Correct: //If it's in the same place it was in the guess, return O.
                    out = out.concat('present, and in the correct spot. ')
                    break;
                default://Otherwise, it has to be present but misplaced. Return X.
                    out = out.concat('present, but in the wrong spot. ')
                    break;
            }
        })
        return out;
    }

    const renderVictory = (hasWon: boolean) => {
        if(hasWon) {
            return "You win!"
        }
    }

    return (
        <div>
            Wordle!

            <form onSubmit={handleGuess}>
                <label>
                    Guess:
                    <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>

            <div id="history">{renderHistory(gameState.history)}</div>
            <br/>
            <div id="victory">{renderVictory(gameState.hasWon)}</div>
        </div>
    );
}
