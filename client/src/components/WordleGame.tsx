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
    let accuracy: LetterGuess[] = [];
    //Shorthand will be used for accuracy. Whitespace indicates absence of the corresponding character. X indicates presence but in a different location. O indicates presence in that location.

    accuracy = guess.split('').map(function(char: string, i: number) {
        let tempAcc: LetterGuessState;
        switch(target.indexOf(char)) { //For each character in guess, check if it's in the secret word.
            case -1: //If not, return whitespace.
                tempAcc = LetterGuessState.Incorrect;
                break;
            case i: //If it's in the same place it was in the guess, return O.
                tempAcc = LetterGuessState.Correct;
                break;
            default://Otherwise, it has to be present but misplaced. Return X.
                tempAcc = LetterGuessState.Misplaced;
                break;
        }
        let letterGuess: LetterGuess = {letter: char, position: i, state: tempAcc};
        return letterGuess;
    })
    let victory = true;
    accuracy.forEach(char => {if(char.state != LetterGuessState.Correct){ victory = false; }})
    updateGameState({
        ...gameState,
        history: history.concat({
            guess: guess,
            accuracy: accuracy,
        }),
        guessNumber: (history.length+2),
        hasWon: victory,
    });
}

export const WordleGame = () => {
    const [guess, setGuess] = useState("")
    const [gameState, updateGameState] = useState<GameState>({
        history: [],
        guessNumber: 1,
        guessesAllowed: 6,
        secretWord: 'angry',
        hasWon: false
    } as GameState);
    const { guessesAllowed, guessNumber, hasWon, history, secretWord } = gameState;

    const handleGuess = (event: any) => {
        event.preventDefault();
        CheckGuess(guess, gameState, updateGameState);
        setGuess('');
    }

    const renderHistory = (history: HistoryEntry[]) => {
        let out: string[];
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
        let out = "";
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
        } else if (gameState.history.length >= gameState.guessesAllowed) {
            return "You lose!"
        }
    }

    return (
        <div>
            <h2>Wordle!</h2>

            <label>
                Guess:
                <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)}/>
            </label>
            <input type="submit" value="Submit" onClick={handleGuess}/>
            Guess #{guessNumber}<br/>
            Guesses Left: {guessesAllowed-(guessNumber-1)}

            <div id="history">{renderHistory(gameState.history)}</div>
            <br/>
            <div id="victory">{renderVictory(gameState.hasWon)}</div>
        </div>
    );
}
