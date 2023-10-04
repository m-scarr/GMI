import React, { Component } from 'react';
import "./GameSelector.css"

export default class GameSelector extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className="game-selector-container" onClick={(e) => { e.stopPropagation() }}>
                <header>
                    <img className="hoverable game-selector-back" alt="back" src="./assets/back.png" onClick={() => {
                        this.props.app.set('currentModal', 'selectMode');
                    }} />
                    <div>Choose Game</div>
                    <img className="hoverable game-selector-log-out" onClick={() => {
                        this.props.app.logOut();
                    }} alt="Log Out" src="./assets/logout.png" />
                </header>
                <main>
                    {this.props.app.state.modals.games.map((game) => {
                        return <div key={"game-selector-game-button-" + game.id} className="hoverable game" onClick={() => {
                            this.props.app.openGame(game.id, () => {
                                this.props.app.set('currentModal', null);
                            });
                        }}>
                            {game.name}
                        </div>
                    })}
                    <div className="hoverable game-selector-add-button" onClick={() => {
                        this.props.app.createGame();
                    }}>
                        +
                    </div>
                </main>
            </div>
        )
    }
}
