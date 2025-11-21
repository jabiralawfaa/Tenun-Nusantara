import { Scene } from 'phaser';

export class PolaTenunan extends Scene
{
    constructor ()
    {
        super('PolaTenunan');
        this.selectedColor = 0xFF0000; // Default red color
        this.misiCompleted = 0; // Track completed missions
        this.isDrawing = false; // Track if mouse is pressed
        this.lastX = 0;
        this.lastY = 0;
        this.graphics = null; // Graphics object for drawing
    }

    create ()
    {
        // Add background image
        const background = this.add.image(0, 0, 'bg');
        background.setOrigin(0, 0);
        background.displayWidth = this.scale.width;
        background.displayHeight = this.scale.height;

        // Add title
        const titleText = this.add.text(this.scale.width / 2, 15, 'Tenun Nusantara', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        });
        titleText.setOrigin(0.5, 0);

        // Main layout - using center-based positioning for cleaner calculations
        const padding = 20;
        const canvasWidth = 450;
        const canvasHeight = 480;
        
        // Canvas positioning - left side, centered vertically
        const canvasX = this.scale.width * 0.18; // 18% from left
        const canvasY = this.scale.height * 0.5;
        
        const canvasBox = this.add.rectangle(canvasX, canvasY, canvasWidth, canvasHeight, 0xcccccc);
        canvasBox.setOrigin(0.5, 0.5);
        canvasBox.setStrokeStyle(2, 0x333333);
        canvasBox.setInteractive();

        // Create graphics layer for drawing on canvas
        this.graphics = this.make.graphics({ x: 0, y: 0, add: true });
        this.graphics.setDepth(1);
        
        // Store canvas bounds for drawing constraint
        this.canvasBounds = {
            x: canvasX - canvasWidth / 2,
            y: canvasY - canvasHeight / 2,
            width: canvasWidth,
            height: canvasHeight
        };

        // Draw grid pattern on canvas
        this.drawGridPattern(this.canvasBounds.x, this.canvasBounds.y, canvasWidth, canvasHeight);

        // Add "buah polamu disini" text in the center of canvas
        const placeholderText = this.add.text(canvasX, canvasY, 'buah polamu disini', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '20px',
            color: '#666666',
            align: 'center'
        });
        placeholderText.setOrigin(0.5, 0.5);

        // Setup drawing input
        this.input.on('pointerdown', (pointer) => {
            if (pointer.x >= this.canvasBounds.x && pointer.x <= this.canvasBounds.x + this.canvasBounds.width &&
                pointer.y >= this.canvasBounds.y && pointer.y <= this.canvasBounds.y + this.canvasBounds.height) {
                this.isDrawing = true;
                this.lastX = pointer.x;
                this.lastY = pointer.y;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (this.isDrawing) {
                this.graphics.lineStyle(3, this.selectedColor);
                this.graphics.lineBetween(this.lastX, this.lastY, pointer.x, pointer.y);
                this.lastX = pointer.x;
                this.lastY = pointer.y;
            }
        });

        this.input.on('pointerup', () => {
            this.isDrawing = false;
        });

        // Color picker - positioned below canvas
        const colorPickerY = canvasY + canvasHeight / 2 + 50;
        
        const colorPickerLabel = this.add.text(canvasX - 60, colorPickerY - 25, 'Pilih Warna:', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '15px',
            color: '#ffffff'
        });
        colorPickerLabel.setOrigin(0, 0);

        const colorPickerBox = this.add.rectangle(canvasX, colorPickerY, 200, 80, 0x000000);
        colorPickerBox.setOrigin(0.5, 0.5);
        colorPickerBox.setStrokeStyle(2, 0xffffff);

        // Add color options - horizontal layout with preset colors
        const colors = [0xFF0000, 0x0000FF, 0x00FF00]; // Red, Blue, Green
        const colorSpacing = 60;

        colors.forEach((color, index) => {
            const colorX = canvasX - 65 + index * colorSpacing;
            const colorCircle = this.add.circle(colorX, colorPickerY - 15, 16, color);
            colorCircle.setInteractive({ useHandCursor: true });
            colorCircle.setName(`color-${index}`);
            colorCircle.setStrokeStyle(2, 0xffffff);
            
            colorCircle.on('pointerdown', () => {
                this.selectedColor = color;
                console.log('Selected color:', color);
            });
        });

        // Add "Warna Kustom" button for custom color picker
        const customColorButton = this.add.rectangle(canvasX, colorPickerY + 25, 160, 35, 0x7b3ff2);
        customColorButton.setOrigin(0.5, 0.5);
        customColorButton.setStrokeStyle(2, 0xffffff);
        customColorButton.setInteractive({ useHandCursor: true });

        const customColorText = this.add.text(canvasX, colorPickerY + 25, 'Warna Kustom', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '14px',
            color: '#ffffff',
            align: 'center'
        });
        customColorText.setOrigin(0.5, 0.5);

        customColorButton.on('pointerdown', () => {
            // Create a simple color input dialog
            const hexColor = prompt('Masukkan warna dalam format HEX (contoh: FF0000 untuk merah):', 'FF0000');
            if (hexColor) {
                try {
                    const colorValue = parseInt(hexColor, 16);
                    this.selectedColor = colorValue;
                    console.log('Selected custom color:', '0x' + hexColor);
                } catch (e) {
                    console.error('Invalid hex color');
                }
            }
        });

        // Buttons - positioned below color picker
        const buttonY = colorPickerY + 65;

        // Kembali button - left side
        const kembaliButton = this.add.rectangle(30, buttonY, 120, 48, 0x7b3ff2);
        kembaliButton.setOrigin(0, 0.5);
        kembaliButton.setStrokeStyle(2, 0xffffff);
        kembaliButton.setInteractive({ useHandCursor: true });

        const kembaliText = this.add.text(90, buttonY, 'Kembali', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        kembaliText.setOrigin(0.5, 0.5);

        kembaliButton.on('pointerdown', () => {
            this.scene.start('TenunanKamu');
        });

        // Misi Pola section - right side
        const misiX = this.scale.width * 0.72; // 72% from left
        const misiStartY = canvasY - 160;

        // Create background box for Misi Pola section
        const misiBoxWidth = 250;
        const misiBoxHeight = 290;
        const misiBackground = this.add.rectangle(misiX, misiStartY + 145, misiBoxWidth, misiBoxHeight, 0x1a1a1a, 0.6);
        misiBackground.setOrigin(0.5, 0.5);
        misiBackground.setStrokeStyle(2, 0x7b3ff2);

        const misiTitle = this.add.text(misiX, misiStartY, 'Misi Pola', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '20px',
            color: '#ffffff',
            align: 'center',
            fontWeight: 'bold'
        });
        misiTitle.setOrigin(0.5, 0);

        // Create mission boxes
        const misionBoxWidth = 220;
        const misionBoxHeight = 60;
        const misionBoxGap = 14;
        const missions = [
            'Pola Garis-garis (Stripes)\nbisa membentuk flora & fauna',
            'Pola Garis-garis (Stripes)\nbisa membentuk flora & fauna',
            'Pola Garis-garis (Stripes)\nbisa membentuk flora & fauna'
        ];

        missions.forEach((mission, index) => {
            const misionBoxY = misiStartY + 45 + index * (misionBoxHeight + misionBoxGap);

            const misionBox = this.add.rectangle(misiX, misionBoxY, misionBoxWidth, misionBoxHeight, 0x000000);
            misionBox.setOrigin(0.5, 0.5);
            misionBox.setStrokeStyle(2, 0xffffff);
            misionBox.setInteractive({ useHandCursor: true });
            misionBox.setName(`mission-${index}`);

            const misionText = this.add.text(misiX, misionBoxY, mission, {
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                fontSize: '13px',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: misionBoxWidth - 15 }
            });
            misionText.setOrigin(0.5, 0.5);

            misionBox.on('pointerdown', () => {
                console.log('Mission clicked:', index + 1);
                this.misiCompleted++;
                // Mark mission as completed (optional: change color or add checkmark)
            });
        });

        // Character section - bottom right corner
        const characterX = this.scale.width - 140;
        const characterY = this.scale.height - 140;

        // Add character image
        const character = this.add.image(characterX, characterY - 80, 'karakter');
        character.setOrigin(0.5, 0.5);
        character.setScale(0.45);

        // Character tooltip/speech bubble
        const characterText = this.add.text(characterX - 140, characterY - 20, 'Buat pola tenun kamu se\nkreatif mungkin. Sapi\nsetidaknya menyelesaikan 3\nmisi untuk membuka\nmenu "Mulai Tenun"', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '12px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 10, y: 8 },
            wordWrap: { width: 180 }
        });
        characterText.setOrigin(0.5, 0.5);

        // Mulai Tenun button - positioned below caption
        const mulaiButtonX = characterX - 140;
        const mulaiButtonY = characterY + 70;
        
        const mulaiButton = this.add.rectangle(mulaiButtonX, mulaiButtonY, 140, 48, 0x7b3ff2);
        mulaiButton.setOrigin(0.5, 0.5);
        mulaiButton.setStrokeStyle(2, 0xffffff);
        mulaiButton.setInteractive({ useHandCursor: true });
        mulaiButton.setName('mulaiTenunButton');

        const mulaiText = this.add.text(mulaiButtonX, mulaiButtonY, 'Mulai Tenun', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        mulaiText.setOrigin(0.5, 0.5);

        mulaiButton.on('pointerdown', () => {
            console.log('Mulai Tenun clicked');
            // TODO: Navigate to weaving scene
        });

        // Handle window resize
        this.scale.on('resize', this.resize, this);
    }

    drawGridPattern(x, y, width, height) {
        const gridSize = 20;
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.lineStyle(1, 0xdddddd);

        // Draw vertical lines
        for (let i = 0; i <= width; i += gridSize) {
            graphics.lineBetween(x + i, y, x + i, y + height);
        }

        // Draw horizontal lines
        for (let i = 0; i <= height; i += gridSize) {
            graphics.lineBetween(x, y + i, x + width, y + i);
        }

        graphics.strokePath();
    }

    resize(gameSize, baseSize, displaySize, resolution)
    {
        // Handle resize if needed
    }
}
