import WordleInterface from "./WordleInterface"

/*
export class WordleGame extends React.Component {
    constructor(props: WordleInterface) {
        super(props);
        this.state = {
            history: [],
            guessNumber: 1,
            guessesAllowed: props.guessesAllowed,
            secretWord: props.secretWord,
            hasWon: false,
        };
    }

    checkGuess(guess: string) {
        if(this.state.history.length >= this.state.guessesAllowed || this.state.hasWon) {
            return;
        }
        const history = this.state.history.slice(0, this.state.guessNumber-1);
        const target = this.state.secretWord;
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
    return <div>
        Wordle!
    </div>
}