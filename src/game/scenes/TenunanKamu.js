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

        // Bg Box
        const boxWidth = this.scale.width;
        const boxHeight = this.scale.height * 1.8;
        const boxCenterX = this.scale.width / 2;
        const boxCenterY = this.scale.height;

        const backgroundBox = this.add.rectangle(boxCenterX, boxCenterY, boxWidth, boxHeight, 0x1a1a1a, 0.7);
        backgroundBox.setOrigin(0.5, 0.5);
        backgroundBox.setStrokeStyle(2, 0x7b3ff2);
        backgroundBox.setName('backgroundBox');

        // Add "Tenunan Kamu" title at the top
        const subTitleText = this.add.text(this.scale.width / 2, 30, 'Tenunan Kamu', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center'
        });
        subTitleText.setOrigin(0.5, 0);
        
        // Animate title with fade and scale
        subTitleText.setAlpha(0);
        subTitleText.setScale(0.5);
        this.tweens.add({
            targets: subTitleText,
            alpha: 1,
            scale: 1,
            duration: 600,
            ease: 'Back.easeOut'
        });

        // Create card containers - Two cards side by side
        const cardWidth = 200;
        const cardHeight = 280;
        const cardsGapX = 60; // Gap between cards
        const cardsStartX = (this.scale.width - (cardWidth * 2 + cardsGapX)) / 2;
        const cardsStartY = 120;

        // First card - "Tenun Pertama"
        const card1 = this.createTenunCard(cardsStartX, cardsStartY, 'Tenun Pertama');
        
        // Animate first card with slide from left
        card1.setAlpha(0);
        card1.x -= 100;
        this.tweens.add({
            targets: card1,
            alpha: 1,
            x: cardsStartX,
            duration: 600,
            delay: 300,
            ease: 'Power2'
        });

        // Second card - "Tenun Berkarya"
        const card2 = this.createTenunCard(cardsStartX + cardWidth + cardsGapX, cardsStartY, 'Tenun Berkarya');
        
        // Animate second card with slide from right
        card2.setAlpha(0);
        card2.x += 100;
        this.tweens.add({
            targets: card2,
            alpha: 1,
            x: cardsStartX + cardWidth + cardsGapX,
            duration: 600,
            delay: 500,
            ease: 'Power2'
        });

        // Create bottom buttons container
        this.createBottomButtons();
        
        // Handle window resize
        this.scale.on('resize', this.resize, this);
    }

    createTenunCard(x, y, cardName) {
        // Create a container for the card
        const cardContainer = this.add.container(x, y);
        cardContainer.setDataEnabled();
        cardContainer.data.set('cardName', cardName);
        cardContainer.setName('tenunCard');
        
        // Create the card background with border effect
        const cardBg = this.add.rectangle(0, 0, 200, 280, 0x1a1a1a); // Dark background for the card
        cardBg.setOrigin(0, 0);
        cardBg.setStrokeStyle(3, 0x7b3ff2); // Purple border
        cardBg.setInteractive({ useHandCursor: true });
        
        // Add black background for image area
        const imageBg = this.add.rectangle(10, 10, 180, 160, 0x000000);
        imageBg.setOrigin(0, 0);
        
        // Load and add the icon kain
        const icon = this.add.image(100, 70, 'icon-kain');
        icon.setOrigin(0.5, 0.5);
        icon.setScale(0.2); // Adjust scale as needed
        
        // Add tenun name below the icon
        const tenunName = this.add.text(100, 190, cardName, {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 180 }
        });
        tenunName.setOrigin(0.5, 0);
        
        // Add hover effect - show buttons when hovered
        let buttonsVisible = false;
        let editButton, pesanButton, editButtonText, pesanButtonText;
        
        cardBg.on('pointerover', () => {
            if (!buttonsVisible) {
                buttonsVisible = true;
                
                // Create overlay background
                const overlayBg = this.add.rectangle(0, 0, 200, 280, 0x000000, 0.8);
                overlayBg.setOrigin(0, 0);
                overlayBg.setName('overlay');
                
                // Create Edit button
                editButton = this.add.rectangle(100, 100, 140, 50, 0x7b3ff2);
                editButton.setOrigin(0.5, 0.5);
                editButton.setStrokeStyle(2, 0xffffff);
                editButton.setInteractive({ useHandCursor: true });
                editButton.setName('editButton');
                
                editButtonText = this.add.text(70, 90, 'Edit', {
                    fontFamily: '"Pixelify Sans", Arial, sans-serif',
                    fontSize: '18px',
                    color: '#ffffff',
                    align: 'center'
                });
                editButtonText.setOrigin(0.5, 0.5);
                editButtonText.setName('editButtonText');
                
                // Add edit icon
                const editIcon = this.add.text(115, 90, '✎', {
                    fontFamily: '"Pixelify Sans", Arial, sans-serif',
                    fontSize: '16px',
                    color: '#ffffff',
                    align: 'center'
                });
                editIcon.setOrigin(0, 0.5);
                editIcon.setName('editIcon');
                
                // Create Pesan button
                pesanButton = this.add.rectangle(100, 165, 140, 50, 0x7b3ff2);
                pesanButton.setOrigin(0.5, 0.5);
                pesanButton.setStrokeStyle(2, 0xffffff);
                pesanButton.setInteractive({ useHandCursor: true });
                pesanButton.setName('pesanButton');
                
                pesanButtonText = this.add.text(70, 155, 'Pesan hasil', {
                    fontFamily: '"Pixelify Sans", Arial, sans-serif',
                    fontSize: '18px',
                    color: '#ffffff',
                    align: 'center'
                });
                pesanButtonText.setOrigin(0.5, 0.5);
                pesanButtonText.setName('pesanButtonText');
                
                // Add pesan icon
                const pesanIcon = this.add.text(130, 155, '▶', {
                    fontFamily: '"Pixelify Sans", Arial, sans-serif',
                    fontSize: '14px',
                    color: '#ffffff',
                    align: 'center'
                });
                pesanIcon.setOrigin(0, 0.5);
                pesanIcon.setName('pesanIcon');
                
                cardContainer.add([overlayBg, editButton, editButtonText, editIcon, pesanButton, pesanButtonText, pesanIcon]);
                
                // Add click functionality
                editButton.on('pointerdown', () => {
                    console.log('Edit button clicked for', cardName);
                });
                
                pesanButton.on('pointerdown', () => {
                    console.log('Pesan hasil button clicked for', cardName);
                });
            }
        });
        
        cardBg.on('pointerout', () => {
            if (buttonsVisible) {
                const overlay = cardContainer.getByName('overlay');
                const editBtn = cardContainer.getByName('editButton');
                const editTxt = cardContainer.getByName('editButtonText');
                const editIco = cardContainer.getByName('editIcon');
                const pesanBtn = cardContainer.getByName('pesanButton');
                const pesanTxt = cardContainer.getByName('pesanButtonText');
                const pesanIco = cardContainer.getByName('pesanIcon');
                
                if (overlay) cardContainer.remove(overlay, true);
                if (editBtn) cardContainer.remove(editBtn, true);
                if (editTxt) cardContainer.remove(editTxt, true);
                if (editIco) cardContainer.remove(editIco, true);
                if (pesanBtn) cardContainer.remove(pesanBtn, true);
                if (pesanTxt) cardContainer.remove(pesanTxt, true);
                if (pesanIco) cardContainer.remove(pesanIco, true);
                
                buttonsVisible = false;
            }
        });
        
        cardContainer.add([cardBg, imageBg, icon, tenunName]);
        
        return cardContainer;
    }

    createBottomButtons() {
        const padding = 20;
        const buttonHeight = 45;
        
        // Create "Kembali" button on the bottom left
        const kembaliButton = this.add.rectangle(padding + 60, this.scale.height - padding - buttonHeight / 2, 120, buttonHeight, 0x7b3ff2);
        kembaliButton.setOrigin(0.5, 0.5);
        kembaliButton.setStrokeStyle(2, 0xffffff);
        kembaliButton.setInteractive({ useHandCursor: true });
        kembaliButton.setName('kembaliButton');
        
        const kembaliText = this.add.text(padding + 60, this.scale.height - padding - buttonHeight / 2, 'Kembali', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        kembaliText.setOrigin(0.5, 0.5);
        kembaliText.setName('kembaliText');
        
        kembaliButton.on('pointerdown', () => {
            console.log('Kembali button clicked');
            this.scene.start('MainMenu');
        });
        
        // Animate kembali button from bottom
        kembaliButton.setAlpha(0);
        kembaliText.setAlpha(0);
        kembaliButton.y += 50;
        kembaliText.y += 50;
        this.tweens.add({
            targets: [kembaliButton, kembaliText],
            alpha: 1,
            y: this.scale.height - padding - buttonHeight / 2,
            duration: 600,
            delay: 700,
            ease: 'Back.easeOut'
        });
        
        // Create "Tambah Tenunan" button on the bottom right
        const tambahButton = this.add.rectangle(this.scale.width - padding - 75, this.scale.height - padding - buttonHeight / 2, 150, buttonHeight, 0x7b3ff2);
        tambahButton.setOrigin(0.5, 0.5);
        tambahButton.setStrokeStyle(2, 0xffffff);
        tambahButton.setInteractive({ useHandCursor: true });
        tambahButton.setName('tambahButton');
        
        const tambahText = this.add.text(this.scale.width - padding - 75, this.scale.height - padding - buttonHeight / 2, 'Tambah Tenunan', {
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        tambahText.setOrigin(0.5, 0.5);
        tambahText.setName('tambahText');
        
        tambahButton.on('pointerdown', () => {
            console.log('Tambah Tenunan button clicked');
            this.scene.start('PolaTenunan');
        });
        
        // Animate tambah button from bottom
        tambahButton.setAlpha(0);
        tambahText.setAlpha(0);
        tambahButton.y += 50;
        tambahText.y += 50;
        this.tweens.add({
            targets: [tambahButton, tambahText],
            alpha: 1,
            y: this.scale.height - padding - buttonHeight / 2,
            duration: 600,
            delay: 900,
            ease: 'Back.easeOut'
        });
    }

    resize(gameSize, baseSize, displaySize, resolution)
    {
        // Resize background
        const background = this.children.list.find(child => child.texture && child.texture.key === 'bg');
        if (background) {
            background.displayWidth = gameSize.width;
            background.displayHeight = gameSize.height;
        }

        // Reposition and resize background box
        const backgroundBox = this.children.list.find(child => child.name === 'backgroundBox');
        if (backgroundBox) {
            const boxWidth = gameSize.width;
            const boxHeight = gameSize.height * 0.8;
            const boxCenterX = gameSize.width / 2;
            const boxCenterY = gameSize.height / 2;
            
            backgroundBox.setPosition(boxCenterX, boxCenterY);
            backgroundBox.setSize(boxWidth, boxHeight);
        }

        // Reposition subtitle
        const subTitleText = this.children.list.find(child => child instanceof Phaser.GameObjects.Text && child.text === 'Tenunan Kamu');
        if (subTitleText) {
            subTitleText.setPosition(gameSize.width / 2, 30);
        }

        // Reposition bottom buttons
        const padding = 20;
        const buttonHeight = 45;

        const kembaliButton = this.children.list.find(child => child.name === 'kembaliButton');
        if (kembaliButton) {
            kembaliButton.setPosition(padding + 60, gameSize.height - padding - buttonHeight / 2);
        }

        const kembaliText = this.children.list.find(child => child.name === 'kembaliText');
        if (kembaliText) {
            kembaliText.setPosition(padding + 60, gameSize.height - padding - buttonHeight / 2);
        }

        const tambahButton = this.children.list.find(child => child.name === 'tambahButton');
        if (tambahButton) {
            tambahButton.setPosition(gameSize.width - padding - 75, gameSize.height - padding - buttonHeight / 2);
        }

        const tambahText = this.children.list.find(child => child.name === 'tambahText');
        if (tambahText) {
            tambahText.setPosition(gameSize.width - padding - 75, gameSize.height - padding - buttonHeight / 2);
        }
    }
}