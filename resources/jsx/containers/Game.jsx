import React from 'react';
import _ from 'lodash';
import { Stars } from '../components/Stars.jsx';
import { ButtonGroup } from '../components/ButtonGroup.jsx';
import { Answer } from '../components/Answer.jsx';
import { Numbers } from '../components/Numbers.jsx';
import { StatusFrame } from '../components/StatusFrame.jsx';


var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) {
        return true;
    }

    if (arr[0] > n) {
        return false;
    }

    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }

    var listSize = arr.length,
        combinationsCount = (1 << listSize);

    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;

        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }

        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};


export default class Game extends React.Component {
    static getRandomNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    static initialState() {
        return {
            selectedNumbers: [],
            usedNumbers: [],
            randomNumberOfStars: Game.getRandomNumber(),
            answerIsCorrect: null,
            redraws: 5,
            doneStatus: null
        };
    }

    state = Game.initialState();

    resetGame = () => this.setState(Game.initialState());

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0 || this.state.usedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }

        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null
        }));
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerIsCorrect: null
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: this.state.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            randomNumberOfStars: Game.getRandomNumber(),
            answerIsCorrect: null
        }), this.updateDoneStatus);
    };

    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }

        this.setState(prevState => ({
            randomNumberOfStars: Game.getRandomNumber(),
            selectedNumbers: [],
            answerIsCorrect: null,
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!' };
            }

            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }
        });
    };

    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );

        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    };

    render() {
        const {
            selectedNumbers,
            usedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            redraws,
            doneStatus
        } = this.state;

        return (
            <div className="container">
                <br />
                <h3>Play Nine</h3>
                <hr />
                {!doneStatus ?
                    <div>
                        <div className="row">
                            <div className="col-5">
                                <Stars numberOfStars={randomNumberOfStars} />
                            </div>
                            <div className="col-2">
                                <ButtonGroup answerIsCorrect={answerIsCorrect}
                                             checkAnswer={this.checkAnswer}
                                             selectedNumbers={selectedNumbers}
                                             acceptAnswer={this.acceptAnswer}
                                             redraw={this.redraw}
                                             redraws={redraws} />
                            </div>
                            <div className="col-5">
                                <Answer numbers={selectedNumbers}
                                        unselectNumber={this.unselectNumber} />
                            </div>
                        </div>
                        <br />
                    </div> :
                    null
                }

                {doneStatus ?
                    <StatusFrame doneStatus={doneStatus}
                               resetGame={this.resetGame} /> :
                    <Numbers selectNumber={this.selectNumber}
                             selectedNumbers={selectedNumbers}
                             usedNumbers={usedNumbers} />
                }
            </div>
        );
    }
};