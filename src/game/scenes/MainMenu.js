import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Add background image
        const background = this.add.image(0, 0, 'bg');
        background.setOrigin(0, 0);
        background.displayWidth = this.scale.width;
        background.displayHeight = this.scale.height;

        // Calculate grid positions - divide the width into 4 equal columns
        const colWidth = this.scale.width / 10;

        // Add logo in the first grid column (leftmost)
        const logo = this.add.image(colWidth * 0.5, this.scale.height * 0.15, 'logo');
        logo.setOrigin(0.5, 0.5);

        // Scale the logo appropriately
        const logoScale = 0.2;
        logo.setScale(logoScale);
        
        // Animate logo with scale and fade
        logo.setAlpha(0);
        logo.setScale(0);
        this.tweens.add({
            targets: logo,
            alpha: 1,
            scale: logoScale,
            duration: 800,
            ease: 'Back.easeOut'
        });

        // Add "Tenun" text in columns 2-4 (middle and right columns), left-aligned
        const tenunText = this.add.text(colWidth, 15, 'Tenun', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '100px',
            color: '#ffffff',
            align: 'left',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        });
        tenunText.setOrigin(0, 0); // Left-aligned text, align top
        
        // Animate "Tenun" text with slide from right
        tenunText.setAlpha(0);
        tenunText.x += 100;
        this.tweens.add({
            targets: tenunText,
            alpha: 1,
            x: colWidth,
            duration: 800,
            delay: 300,
            ease: 'Power2'
        });

        // Add "Nusantara" text below "Tenun", also in columns 2-4, left-aligned
        const nusantaraText = this.add.text(colWidth, 105, 'Nusantara', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '90px',
            color: '#ffffff',
            align: 'left',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        });
        nusantaraText.setOrigin(0, 0); // Left-aligned text, align top
        
        // Animate "Nusantara" text with slide from right
        nusantaraText.setAlpha(0);
        nusantaraText.x += 100;
        this.tweens.add({
            targets: nusantaraText,
            alpha: 1,
            x: colWidth,
            duration: 800,
            delay: 500,
            ease: 'Power2'
        });

        // Create circular purple "Mulai" button in bottom-right corner
        const buttonRadius = 80;
        const buttonX = this.scale.width - buttonRadius - 30;
        const buttonY = this.scale.height - buttonRadius - 30;

        // Create the circular button background
        const button = this.add.circle(buttonX, buttonY, buttonRadius, 0x800080) // Purple color
            .setInteractive({ useHandCursor: true });

        // Add "Mulai" text on the button
        const buttonText = this.add.text(buttonX, buttonY, 'Mulai', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Animate button with scale and bounce
        button.setAlpha(0);
        button.setScale(0);
        buttonText.setAlpha(0);
        this.tweens.add({
            targets: [button, buttonText],
            alpha: 1,
            scale: 1,
            duration: 600,
            delay: 700,
            ease: 'Back.easeOut'
        });

        // Add hover effects
        button.on('pointerover', () => {
            button.setFillStyle(0xa050a0); // Lighter purple on hover
        });

        button.on('pointerout', () => {
            button.setFillStyle(0x800080); // Original purple
        });

        // Add click functionality
        button.on('pointerdown', () => {
            this.scene.start('TenunanKamu2');
        });

        // Handle window resize to reposition elements
        this.scale.on('resize', this.resize, this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        // Resize background
        const background = this.children.list.find(child => child.texture.key === 'bg');
        if (background) {
            background.displayWidth = gameSize.width;
            background.displayHeight = gameSize.height;
        }

        // Calculate grid positions based on new size
        const colWidth = gameSize.width / 4;

        // Reposition elements
        const logo = this.children.list.find(child => child.texture.key === 'logo');
        if (logo) {
            logo.setPosition(colWidth * 0.5, gameSize.height * 0.15);
        }

        const tenunText = this.children.list.find(child => child instanceof Phaser.GameObjects.Text && child.text === 'Tenun');
        if (tenunText) {
            // Using fixed position to keep text near the top regardless of screen size
            tenunText.setPosition(colWidth, 15);
        }

        const nusantaraText = this.children.list.find(child => child instanceof Phaser.GameObjects.Text && child.text === 'Nusantara');
        if (nusantaraText) {
            // Using fixed position to keep text near the top regardless of screen size
            nusantaraText.setPosition(colWidth, 145);
        }

        // Reposition button to bottom-right
        const button = this.children.list.find(child => child instanceof Phaser.GameObjects.Circle);
        if (button) {
            const buttonRadius = 80;
            button.setPosition(gameSize.width - buttonRadius - 30, gameSize.height - buttonRadius - 30);
        }

        const buttonText = this.children.list.find(child => child instanceof Phaser.GameObjects.Text && child.text === 'Mulai');
        if (buttonText) {
            // Find the button position to center text
            const button = this.children.list.find(child => child instanceof Phaser.GameObjects.Circle);
            if (button) {
                buttonText.setPosition(button.x, button.y);
            }
        }
    }
}
