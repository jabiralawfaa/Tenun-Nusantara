import Phaser from 'phaser';

export class KainStats extends Phaser.Scene {
    constructor() {
        super('KainStats');
    }

    preload() {
        // Load the background image
        this.load.image('bg-tenun', 'assets/bg2.png');
        // Load the cloth icon
        this.load.image('icon-kain', 'assets/icon-kain.png');
    }

    create() {
        // Add the background (same as MulaiTenun scene)
        const bg = this.add.image(0, 0, 'bg-tenun');
        bg.setOrigin(0, 0); // Position from top-left corner
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        // Add cloth icon on the left
        const clothIcon = this.add.image(
            150, // x position
            this.scale.height / 2, // y position (center vertically)
            'icon-kain'
        );
        clothIcon.setScale(0.8); // Make it smaller

        // Add statistics text
        const statsText = this.add.text(
            300, // x position (moved further to the right)
            this.scale.height / 2 - 80, // y position (top part)
            'Statistik Tenunan:\n\nMisi Diselesaikan: 0 dari 5\nTenunan Diselesaikan: 0%',
            {
                fontSize: '24px',
                color: '#ffffff', // Changed to white to match the background
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                align: 'left',
                wordWrap: { width: 500 }
            }
        );

        // Add back to menu button at the bottom
        const backButton = this.add.rectangle(
            this.scale.width / 2, // x position (center)
            this.scale.height - 100, // y position (bottom)
            200, // width
            50, // height
            0x7b3ff2 // Purple color
        ).setStrokeStyle(2, 0xffffff) // White border
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => {
             this.scene.start('PolaTenunan'); // Go back to the weaving pattern scene
         });

        // Add text to back button
        const backText = this.add.text(
            this.scale.width / 2,
            this.scale.height - 100,
            'Kembali ke Menu',
            {
                fontSize: '18px',
                color: '#ffffff',
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Animate elements
        clothIcon.setAlpha(0);
        statsText.setAlpha(0);
        backButton.setAlpha(0);
        backText.setAlpha(0);

        this.tweens.add({
            targets: clothIcon,
            alpha: 1,
            duration: 600,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: [statsText, backButton, backText],
            alpha: 1,
            duration: 600,
            delay: 200,
            ease: 'Power2'
        });
    }
}