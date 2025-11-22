import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
// import { TenunanKamu } from './scenes/TenunanKamu';
import { TenunanKamu2 } from './scenes/Tenunankamu2';
import { AUTO, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.RESIZE, // Changed to RESIZE for true full screen
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1920,
            height: 1080
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        TenunanKamu2,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
