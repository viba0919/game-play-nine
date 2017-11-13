import React from 'react';
import ReactDOM from 'react-dom';
import Game from './containers/Game.jsx';


class App extends React.Component {
    render() {
        return (
            <Game />
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));