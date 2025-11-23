import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { TenunanKamu } from './scenes/TenunanKamu';
import { PesanTenun } from './scenes/PesanTenun';
import { PolaTenunan } from './scenes/PolaTenunan';
import { MulaiTenun } from './scenes/MulaiTenun';
import { KainStats } from './scenes/KainStats';
import Phaser, { AUTO, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    dom: { createContainer: true },
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
        TenunanKamu,
        PesanTenun,
        PolaTenunan,
        MulaiTenun,
        KainStats,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
