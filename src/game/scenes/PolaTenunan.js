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

        // bg box
        const boxWidth = this.scale.width;
        const boxHeight = this.scale.height * 1.8;
        const boxCenterX = this.scale.width / 2;
        const boxCenterY = this.scale.height;

        const backgroundBox = this.add.rectangle(boxCenterX, boxCenterY, boxWidth, boxHeight, 0x1a1a1a, 0.7);
        backgroundBox.setOrigin(0.5, 0.5);
        backgroundBox.setStrokeStyle(2, 0x7b3ff2);
        backgroundBox.setName('backgroundBox');

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
        
        // Animate title
        titleText.setAlpha(0);
        titleText.setScale(0.5);
        this.tweens.add({
            targets: titleText,
            alpha: 1,
            scale: 1,
            duration: 600,
            ease: 'Back.easeOut'
        });

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
        
        // Animate canvas with scale
        canvasBox.setAlpha(0);
        canvasBox.setScale(0.8);
        this.tweens.add({
            targets: canvasBox,
            alpha: 1,
            scale: 1,
            duration: 600,
            delay: 200,
            ease: 'Back.easeOut'
        });

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
        
        // Animate placeholder text
        placeholderText.setAlpha(0);
        this.tweens.add({
            targets: placeholderText,
            alpha: 1,
            duration: 600,
            delay: 400,
            ease: 'Power2'
        });

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
                // Clamp pointer position to canvas bounds
                let clampedX = Phaser.Math.Clamp(pointer.x, this.canvasBounds.x, this.canvasBounds.x + this.canvasBounds.width);
                let clampedY = Phaser.Math.Clamp(pointer.y, this.canvasBounds.y, this.canvasBounds.y + this.canvasBounds.height);
                
                this.graphics.lineStyle(3, this.selectedColor);
                this.graphics.lineBetween(this.lastX, this.lastY, clampedX, clampedY);
                this.lastX = clampedX;
                this.lastY = clampedY;
            }
        });

        this.input.on('pointerup', () => {
            this.isDrawing = false;
        });

        // Color picker button - positioned below canvas
        const colorPickerY = canvasY + canvasHeight / 2 + 50;
        
        const colorPickerLabel = this.add.text(canvasX - 130, colorPickerY, 'Warna:', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '15px',
            color: '#ffffff'
        });
        colorPickerLabel.setOrigin(0, 0.5);
        
        // Animate color picker label
        colorPickerLabel.setAlpha(0);
        this.tweens.add({
            targets: colorPickerLabel,
            alpha: 1,
            duration: 600,
            delay: 600,
            ease: 'Power2'
        });

        // Selected color display (preview box)
        const colorPreview = this.add.rectangle(canvasX - 50, colorPickerY, 50, 30, this.selectedColor);
        colorPreview.setOrigin(0.5, 0.5);
        colorPreview.setStrokeStyle(2, 0xffffff);
        colorPreview.setName('colorPreview');
        
        // Animate color preview
        colorPreview.setAlpha(0);
        colorPreview.setScale(0.8);
        this.tweens.add({
            targets: colorPreview,
            alpha: 1,
            scale: 1,
            duration: 600,
            delay: 700,
            ease: 'Back.easeOut'
        });

        // "Pilih Warna" button
        const pickColorButton = this.add.rectangle(canvasX + 50, colorPickerY, 140, 35, 0x7b3ff2);
        pickColorButton.setOrigin(0.5, 0.5);
        pickColorButton.setStrokeStyle(2, 0xffffff);
        pickColorButton.setInteractive({ useHandCursor: true });
        pickColorButton.setName('pickColorButton');

        const pickColorText = this.add.text(canvasX + 50, colorPickerY, 'Pilih Warna', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '14px',
            color: '#ffffff',
            align: 'center'
        });
        pickColorText.setOrigin(0.5, 0.5);
        
        // Animate button
        pickColorButton.setAlpha(0);
        pickColorText.setAlpha(0);
        pickColorButton.setScale(0.8);
        pickColorText.setScale(0.8);
        this.tweens.add({
            targets: [pickColorButton, pickColorText],
            alpha: 1,
            scale: 1,
            duration: 600,
            delay: 800,
            ease: 'Back.easeOut'
        });

        // Store color wheel state
        this.colorWheelVisible = false;
        this.colorWheelContainer = null;

        // Button click to show color wheel
        pickColorButton.on('pointerdown', () => {
            if (!this.colorWheelVisible) {
                // Show color wheel di tengah layar
                this.showColorWheel(this.scale.width / 2, this.scale.height / 2, colorPreview);
            } else {
                this.hideColorWheel();
            }
        });

        // Buttons - positioned below color picker
        const buttonY = colorPickerY + 85;

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
        
        // Animate kembali button
        kembaliButton.setAlpha(0);
        kembaliText.setAlpha(0);
        kembaliButton.y += 50;
        kembaliText.y += 50;
        this.tweens.add({
            targets: [kembaliButton, kembaliText],
            alpha: 1,
            y: buttonY,
            duration: 600,
            delay: 900,
            ease: 'Back.easeOut'
        });

        // Misi Pola section - right side
        const misiX = this.scale.width * 0.72; // 72% from left
        const misiStartY = canvasY - 160;

        // Create background box for Misi Pola section
        const misiBoxWidth = 500;
        const misiBoxHeight = 550;
        const misiBackground = this.add.rectangle(misiX, misiStartY + 145, misiBoxWidth, misiBoxHeight, 0x1a1a1a, 0.6);
        misiBackground.setOrigin(0.5, 0.5);
        misiBackground.setStrokeStyle(2, 0x7b3ff2);
        
        // Animate misi background
        misiBackground.setAlpha(0);
        misiBackground.setScale(0.9);
        this.tweens.add({
            targets: misiBackground,
            alpha: 0.6,
            scale: 1,
            duration: 600,
            delay: 300,
            ease: 'Back.easeOut'
        });

        const misiTitle = this.add.text(misiX, 100, 'Misi Pola', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '48px',
            color: '#ffffff',
            align: 'center',
            fontWeight: 'bold'
        });
        misiTitle.setOrigin(0.5, 0);
        
        // Animate misi title
        misiTitle.setAlpha(0);
        misiTitle.x += 100;
        this.tweens.add({
            targets: misiTitle,
            alpha: 1,
            x: misiX,
            duration: 600,
            delay: 400,
            ease: 'Power2'
        });

        // Create mission boxes
        const misionBoxWidth = misiBoxWidth * 0.8;
        const misionBoxHeight = 60;
        const misionBoxGap = 18;
        const missions = [
            'Pola Garis-garis (Stripes)\nbisa membentuk flora & fauna',
            'Pola Garis-garis (Stripes)\nbisa membentuk flora & fauna',
            'Pola Garis-garis (Stripes)\nbisa membentuk flora & fauna'
        ];

        missions.forEach((mission, index) => {
            const misionBoxY = misiStartY + 20 + index * (misionBoxHeight + misionBoxGap);

            const misionBox = this.add.rectangle(misiX, misionBoxY, misionBoxWidth, misionBoxHeight, 0x000000);
            misionBox.setOrigin(0.5, 0.5);
            misionBox.setStrokeStyle(2, 0xffffff);
            misionBox.setInteractive({ useHandCursor: true });
            misionBox.setName(`mission-${index}`);

            const misionText = this.add.text(misiX, misionBoxY, mission, {
                fontFamily: '"Pixelify Sans", Arial, sans-serif',
                fontSize: '18px',
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
            
            // Animate mission boxes
            misionBox.setAlpha(0);
            misionText.setAlpha(0);
            misionBox.x += 100;
            misionText.x += 100;
            this.tweens.add({
                targets: [misionBox, misionText],
                alpha: 1,
                x: misiX,
                duration: 600,
                delay: 600 + (index * 150),
                ease: 'Power2'
            });
        });

        // Character section - bottom right corner
        const characterX = this.scale.width - 140;
        const characterY = this.scale.height - 140;

        // Add character image
        const character = this.add.image(characterX, characterY - 80, 'karakter');
        character.setOrigin(0.5, 0.5);
        character.setScale(0.45);
        
        // Animate character with bounce
        character.setAlpha(0);
        character.setScale(0);
        this.tweens.add({
            targets: character,
            alpha: 1,
            scale: 0.45,
            duration: 800,
            delay: 1000,
            ease: 'Bounce.easeOut'
        });

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
        
        // Animate character text
        characterText.setAlpha(0);
        characterText.setScale(0.8);
        this.tweens.add({
            targets: characterText,
            alpha: 1,
            scale: 1,
            duration: 600,
            delay: 1200,
            ease: 'Back.easeOut'
        });

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
        
        // Animate mulai button
        mulaiButton.setAlpha(0);
        mulaiText.setAlpha(0);
        mulaiButton.setScale(0.8);
        mulaiText.setScale(0.8);
        this.tweens.add({
            targets: [mulaiButton, mulaiText],
            alpha: 1,
            scale: 1,
            duration: 600,
            delay: 1300,
            ease: 'Back.easeOut'
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

    showColorWheel(x, y, colorPreview) {
        this.colorWheelVisible = true;
        
        // Background overlay (semi-transparent) - dibuat di luar container
        const overlay = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width * 2, this.scale.height * 2, 0x000000, 0.7);
        overlay.setOrigin(0.5, 0.5);
        overlay.setDepth(999);
        overlay.setInteractive();
        overlay.on('pointerdown', () => this.hideColorWheel());
        this.colorWheelOverlay = overlay;
        
        // Create container for color wheel
        const container = this.add.container(x, y);
        container.setDepth(1000);
        this.colorWheelContainer = container;
        
        // Color wheel background panel
        const panelWidth = 280;
        const panelHeight = 360;
        const panel = this.add.rectangle(0, 0, panelWidth, panelHeight, 0x2a2a2a);
        panel.setOrigin(0.5, 0.5);
        panel.setStrokeStyle(3, 0x7b3ff2);
        
        // Title
        const title = this.add.text(0, -panelHeight/2 + 25, 'Pilih Warna', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        title.setOrigin(0.5, 0.5);
        
        // Create color wheel using canvas render texture
        const wheelRadius = 90;
        const wheelSize = wheelRadius * 2;
        
        // Create render texture for color wheel
        const wheelRT = this.add.renderTexture(0, -20, wheelSize, wheelSize);
        
        // Draw color wheel directly on render texture
        const tempGraphics = this.add.graphics();
        
        // Draw color wheel dengan saturation gradient dari center ke edge
        for (let angle = 0; angle < 360; angle += 2) {
            for (let radius = 0; radius <= wheelRadius; radius += 1) {
                const hue = angle / 360;
                const saturation = radius / wheelRadius;
                const color = Phaser.Display.Color.HSVToRGB(hue, saturation, 1);
                const hexColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
                
                tempGraphics.fillStyle(hexColor, 1);
                const rad = Phaser.Math.DegToRad(angle);
                const px = Math.cos(rad) * radius + wheelRadius;
                const py = Math.sin(rad) * radius + wheelRadius;
                tempGraphics.fillCircle(px, py, 2);
            }
        }
        
        // Draw white center (low saturation)
        const centerGradient = tempGraphics.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 1, 1, 0.5, 0);
        tempGraphics.fillCircle(wheelRadius, wheelRadius, wheelRadius * 0.15);
        
        // Render graphics to texture
        wheelRT.draw(tempGraphics);
        tempGraphics.destroy();
        
        // Set interactive area
        const wheelImage = wheelRT;
        wheelImage.setInteractive(new Phaser.Geom.Circle(wheelRadius, wheelRadius, wheelRadius), Phaser.Geom.Circle.Contains);
        
        // Color indicator (cursor)
        const indicator = this.add.circle(0, -20, 8, 0xffffff);
        indicator.setStrokeStyle(2, 0x000000);
        
        // Handle color wheel click
        wheelImage.on('pointerdown', (pointer) => {
            // Get local coordinates relative to the wheel center
            const localX = pointer.x - x;
            const localY = pointer.y - y + 20; // offset karena wheel di y: -20
            const distance = Math.sqrt(localX * localX + localY * localY);
            
            if (distance <= wheelRadius) {
                const angle = Math.atan2(localY, localX);
                const hue = ((angle * 180 / Math.PI) + 360) % 360;
                const saturation = Math.min(distance / wheelRadius, 1);
                
                const color = Phaser.Display.Color.HSVToRGB(hue / 360, saturation, 1);
                this.selectedColor = (color.r << 16) | (color.g << 8) | color.b;
                colorPreview.setFillStyle(this.selectedColor);
                
                // Update indicator position relative to wheel
                indicator.x = localX;
                indicator.y = localY - 20;
                
                console.log('Selected color: 0x' + this.selectedColor.toString(16).padStart(6, '0').toUpperCase());
            }
        });
        
        // Preset colors
        const presetColors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3, 0xFFFFFF, 0x000000];
        const presetY = panelHeight/2 - 70;
        const presetStartX = -100;
        
        presetColors.forEach((color, index) => {
            const presetBox = this.add.rectangle(
                presetStartX + (index % 5) * 45, 
                presetY + Math.floor(index / 5) * 35, 
                35, 30, color
            );
            presetBox.setStrokeStyle(2, 0xffffff);
            presetBox.setInteractive({ useHandCursor: true });
            presetBox.on('pointerdown', () => {
                this.selectedColor = color;
                colorPreview.setFillStyle(this.selectedColor);
                console.log('Selected preset color: 0x' + this.selectedColor.toString(16).padStart(6, '0').toUpperCase());
            });
            container.add(presetBox);
        });
        
        // Close button
        const closeButton = this.add.rectangle(0, panelHeight/2 - 25, 120, 35, 0x7b3ff2);
        closeButton.setStrokeStyle(2, 0xffffff);
        closeButton.setInteractive({ useHandCursor: true });
        
        const closeText = this.add.text(0, panelHeight/2 - 25, 'Selesai', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '14px',
            color: '#ffffff'
        });
        closeText.setOrigin(0.5, 0.5);
        
        closeButton.on('pointerdown', () => this.hideColorWheel());
        
        // Add all elements to container
        container.add([panel, title, wheelImage, indicator, closeButton, closeText]);
        
        // Animate appearance - both overlay and container
        overlay.setAlpha(0);
        container.setAlpha(0);
        container.setScale(0.7);
        this.tweens.add({
            targets: overlay,
            alpha: 0.7,
            duration: 300,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: container,
            alpha: 1,
            scale: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }
    
    hideColorWheel() {
        if (this.colorWheelContainer) {
            this.tweens.add({
                targets: this.colorWheelContainer,
                alpha: 0,
                scale: 0.7,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    this.colorWheelContainer.destroy();
                    this.colorWheelContainer = null;
                    this.colorWheelVisible = false;
                }
            });
        }
        
        // Hapus overlay juga
        if (this.colorWheelOverlay) {
            this.tweens.add({
                targets: this.colorWheelOverlay,
                alpha: 0,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    this.colorWheelOverlay.destroy();
                    this.colorWheelOverlay = null;
                }
            });
        }
    }

    resize(gameSize, baseSize, displaySize, resolution)
    {
        // Handle resize if needed
    }
}
