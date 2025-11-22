import Phaser from 'phaser';

export class MulaiTenun extends Phaser.Scene {
    constructor() {
        super('MulaiTenun');
    }

    preload() {
        // Load the background image
        this.load.image('bg-tenun', 'assets/bg2.png');
    }

    create() {
        // Add the background
        const bg = this.add.image(0, 0, 'bg-tenun');
        bg.setOrigin(0, 0); // Position from top-left corner
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;

        // Add 128 vertical threads (benang) centered on the screen
        const totalThreads = 128;
        const threadThickness = 5;
        const spacing = 7; // Space between threads
        const totalWidth = (totalThreads - 1) * spacing;
        const startX = (this.scale.width - totalWidth) / 2; // Center the threads

        for (let i = 0; i < totalThreads; i++) {
            const x = startX + (i * spacing);

            // Create vertical thread line
            const thread = this.add.rectangle(
                x, // x position
                this.scale.height / 2, // y position (center vertically)
                threadThickness, // width (5 pixels)
                this.scale.height, // height (full screen height)
                0xffffff // White color for thread
            );

            // Optional: Add slight animation to threads for visual interest
            thread.setAlpha(0.9);
        }

        // Back button - bottom left
        const backButton = this.add.rectangle(
            100, // x position (left side)
            this.scale.height - 100, // y position (bottom)
            120, // width
            45, // height
            0x7b3ff2 // Purple color matching other scenes
        ).setStrokeStyle(2, 0xffffff) // White border
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => {
             this.scene.start('PolaTenunan'); // Navigate back to pattern scene
         });

        // Add text to back button
        const backText = this.add.text(
            100,
            this.scale.height - 100,
            'Kembali',
            {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Animate back button from bottom
        backButton.setAlpha(0);
        backText.setAlpha(0);
        backButton.y += 50;
        backText.y += 50;
        this.tweens.add({
            targets: [backButton, backText],
            alpha: 1,
            y: this.scale.height - 100,
            duration: 600,
            delay: 300,
            ease: 'Back.easeOut'
        });

        // Right Pedal button - right side, slightly down
        const pedalKananButton = this.add.rectangle(
            this.scale.width - 120, // x position (right side)
            this.scale.height - 180, // y position (slightly above bottom)
            120, // width
            45, // height
            0x7b3ff2 // Purple color matching other scenes
        ).setStrokeStyle(2, 0xffffff) // White border
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => {
             console.log('Pedal Kanan pressed');
         });

        // Add text to right pedal button
        const pedalKananText = this.add.text(
            this.scale.width - 120,
            this.scale.height - 180,
            'Pedal Kanan',
            {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Animate right pedal button from right
        pedalKananButton.setAlpha(0);
        pedalKananText.setAlpha(0);
        pedalKananButton.x += 100;
        pedalKananText.x += 100;
        this.tweens.add({
            targets: [pedalKananButton, pedalKananText],
            alpha: 1,
            x: this.scale.width - 120,
            duration: 600,
            delay: 500,
            ease: 'Power2'
        });

        // Left Pedal button - left side, slightly down (same vertical position as right pedal)
        const pedalKiriButton = this.add.rectangle(
            120, // x position (left side)
            this.scale.height - 180, // y position (same as right pedal)
            120, // width
            45, // height
            0x7b3ff2 // Purple color matching other scenes
        ).setStrokeStyle(2, 0xffffff) // White border
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => {
             console.log('Pedal Kiri pressed');
         });

        // Add text to left pedal button
        const pedalKiriText = this.add.text(
            120,
            this.scale.height - 180,
            'Pedal Kiri',
            {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Animate left pedal button from left
        pedalKiriButton.setAlpha(0);
        pedalKiriText.setAlpha(0);
        pedalKiriButton.x -= 100;
        pedalKiriText.x -= 100;
        this.tweens.add({
            targets: [pedalKiriButton, pedalKiriText],
            alpha: 1,
            x: 120,
            duration: 600,
            delay: 500,
            ease: 'Power2'
        });

        // Weft (Pakan) button - top right
        const pakanButton = this.add.rectangle(
            this.scale.width - 120, // x position (right side)
            80, // y position (top)
            120, // width
            45, // height
            0x7b3ff2 // Purple color matching other scenes
        ).setStrokeStyle(2, 0xffffff) // White border
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => {
             console.log('Pakan pressed');
         });

        // Add text to weft button
        const pakanText = this.add.text(
            this.scale.width - 120,
            80,
            'Pakan',
            {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Animate pakan button from top
        pakanButton.setAlpha(0);
        pakanText.setAlpha(0);
        pakanButton.y -= 50;
        pakanText.y -= 50;
        this.tweens.add({
            targets: [pakanButton, pakanText],
            alpha: 1,
            y: 80,
            duration: 600,
            delay: 400,
            ease: 'Back.easeOut'
        });

    }
}