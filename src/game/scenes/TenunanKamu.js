import { Scene } from 'phaser';

export class TenunanKamu extends Scene
{
    constructor ()
    {
        super('TenunanKamu');
    }

    create ()
    {
        // Add background image (same as main menu)
        const background = this.add.image(0, 0, 'bg');
        background.setOrigin(0, 0);
        background.displayWidth = this.scale.width;
        background.displayHeight = this.scale.height;

        // Add logo in top-left corner with smaller size
        const logo = this.add.image(20, 10, 'logo');
        logo.setOrigin(0, 0);
        
        // Scale the logo smaller
        const logoScale = 0.2;
        logo.setScale(logoScale);

        // Add "Tenun Nusantara" text (single line) next to the logo, positioned at top
        const titleText = this.add.text(60, 15, 'Tenun Nusantara', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '32px',  // Smaller size
            color: '#ffffff',
            align: 'left',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        });
        titleText.setOrigin(0, 0);

        // Create the semi-transparent black box from the bottom
        // Calculate box dimensions - it should be wide as the screen and extend from bottom
        // but not cover the title text and logo
        const boxHeight = this.scale.height * 0.4; // 40% of screen height
        const boxY = this.scale.height - boxHeight; // Position from bottom
        
        const blackBox = this.add.graphics();
        // Draw a rectangle with rounded corners at the top only
        blackBox.fillStyle(0x000000, 0.75); // Black with 75% transparency (25% visibility)
        
        // Draw the box with rounded top corners
        const cornerRadius = 12; // "md" rounded corners
        blackBox.fillRoundedRect(0, boxY, this.scale.width, boxHeight, {tl: cornerRadius, tr: cornerRadius, bl: 0, br: 0});

        // Check if tenun data exists (for now we'll simulate this check)
        const hasTenunData = false; // This would typically be determined by checking actual data
        
        if (hasTenunData) {
            // Create the tenun card when data exists
            this.createTenunCard(100, boxY + 20); // Positioned inside the black box
        } else {
            // Show only "Tambah" button when no data exists
            this.createTambahButton(this.scale.width / 2, boxY + 50);
        }
        
        // Handle window resize
        this.scale.on('resize', this.resize, this);
    }

    createTambahButton(x, y) {
        // Create "Tambah" button
        const tambahButton = this.add.rectangle(x, y, 120, 40, 0x27ae60); // Green button
        tambahButton.setOrigin(0.5, 0);
        tambahButton.setInteractive({ useHandCursor: true });
        
        const tambahButtonText = this.add.text(x, y, 'Tambah', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        tambahButtonText.setOrigin(0.5, 0.5);
        
        // Add hover effect
        tambahButton.on('pointerover', () => {
            tambahButton.setFillStyle(0x2ecc71); // Lighter green on hover
        });
        
        tambahButton.on('pointerout', () => {
            tambahButton.setFillStyle(0x27ae60); // Original green
        });
        
        // Add click functionality
        tambahButton.on('pointerdown', () => {
            // TODO: Implement tambah functionality
            console.log('Tambah button clicked');
        });
    }

    createTenunCard(x, y) {
        // Create a container for the card
        const cardContainer = this.add.container(x, y);
        
        // Create the card background
        const cardBg = this.add.rectangle(0, 0, 150, 200, 0x2c3e50); // Dark background for the card
        cardBg.setOrigin(0, 0);
        cardBg.setInteractive({ useHandCursor: true });
        
        // Load and add the budayago icon
        const icon = this.add.image(75, 50, 'budayago'); // Centered in card
        icon.setOrigin(0.5, 0);
        icon.setScale(0.5); // Adjust scale as needed
        
        // Add tenun name below the icon
        const tenunName = this.add.text(75, 110, 'Tenun Pertama', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        tenunName.setOrigin(0.5, 0);
        
        // Add hover effect - show buttons when hovered
        let buttonsVisible = false;
        let editButton, pesanButton;
        
        cardBg.on('pointerover', () => {
            if (!buttonsVisible) {
                buttonsVisible = true;
                
                // Create Edit button
                editButton = this.add.rectangle(45, 160, 40, 25, 0x3498db); // Blue button
                editButton.setOrigin(0.5, 0);
                
                const editButtonText = this.add.text(45, 160, 'Edit', {
                    fontFamily: '"Pixelify Sans", Arial, sans-serif',
                    fontSize: '14px',
                    color: '#ffffff',
                    align: 'center'
                });
                editButtonText.setOrigin(0.5, 0.5);
                
                // Create Pesan button
                pesanButton = this.add.rectangle(105, 160, 40, 25, 0x27ae60); // Green button
                pesanButton.setOrigin(0.5, 0);
                
                const pesanButtonText = this.add.text(105, 160, 'Pesan', {
                    fontFamily: '"Pixelify Sans", Arial, sans-serif',
                    fontSize: '14px',
                    color: '#ffffff',
                    align: 'center'
                });
                pesanButtonText.setOrigin(0.5, 0.5);
                
                cardContainer.add([editButton, pesanButton, editButtonText, pesanButtonText]);
            }
        });
        
        cardBg.on('pointerout', () => {
            if (buttonsVisible && editButton && pesanButton) {
                cardContainer.remove([editButton, pesanButton, editButtonText, pesanButtonText]);
                editButton.destroy();
                pesanButton.destroy();
                editButtonText.destroy();
                pesanButtonText.destroy();
                buttonsVisible = false;
            }
        });
        
        cardContainer.add([cardBg, icon, tenunName]);
    }

    resize(gameSize, baseSize, displaySize, resolution)
    {
        // Resize background
        const background = this.children.list.find(child => child.texture.key === 'bg');
        if (background) {
            background.displayWidth = gameSize.width;
            background.displayHeight = gameSize.height;
        }

        // Reposition elements
        const logo = this.children.list.find(child => child.texture.key === 'logo');
        if (logo) {
            logo.setPosition(20, 10);
            logo.setScale(0.2); // Maintain small scale
        }

        const titleText = this.children.list.find(child => child instanceof Phaser.GameObjects.Text && child.text === 'Tenun Nusantara');
        if (titleText) {
            titleText.setPosition(60, 15);
        }

        // Find and reposition the black box
        const graphics = this.children.list.filter(child => child instanceof Phaser.GameObjects.Graphics);
        if (graphics.length > 0) {
            const blackBox = graphics[0];
            blackBox.clear();
            
            const boxHeight = gameSize.height * 0.4;
            const boxY = gameSize.height - boxHeight;
            const cornerRadius = 12;
            
            blackBox.fillStyle(0x000000, 0.75);
            blackBox.fillRoundedRect(0, boxY, gameSize.width, boxHeight, {tl: cornerRadius, tr: cornerRadius, bl: 0, br: 0});
        }
        
        // Reposition tambah button if it exists
        const tambahButton = this.children.list.find(child => 
            child instanceof Phaser.GameObjects.Rectangle && child.fillColor === 0x27ae60
        );
        if (tambahButton) {
            const boxY = gameSize.height - (gameSize.height * 0.4);
            tambahButton.setPosition(gameSize.width / 2, boxY + 50);
        }
    }
}