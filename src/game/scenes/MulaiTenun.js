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

        // Array to store references to all threads
        this.threads = [];

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

            // Set initial alpha
            thread.setAlpha(0.9);

            // Store reference to this thread with its index
            thread.index = i;
            this.threads.push(thread);
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
             // When right pedal is clicked: odd-numbered threads become transparent (75%), even-numbered stay solid
             this.threads.forEach(thread => {
                 if ((thread.index + 1) % 2 !== 0) { // Odd numbers (thread.index is 0-based, so +1 to get actual number)
                     thread.setAlpha(0.25); // 75% transparent = 25% visible
                 } else { // Even numbers
                     thread.setAlpha(0.9); // Full visibility
                 }
             });
             // Update pedal pressed state
             this.rightPedalPressed = true;
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
             // When left pedal is clicked: even-numbered threads become transparent (75%), odd-numbered stay solid
             this.threads.forEach(thread => {
                 if ((thread.index + 1) % 2 === 0) { // Even numbers (thread.index is 0-based, so +1 to get actual number)
                     thread.setAlpha(0.25); // 75% transparent = 25% visible
                 } else { // Odd numbers
                     thread.setAlpha(0.9); // Full visibility
                 }
             });
             // Update pedal pressed state
             this.leftPedalPressed = true;
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
             // For the first pakan: check if left pedal has been pressed
             if (this.pakanCount === 0 && !this.leftPedalPressed) {
                 // Show popup message
                 this.showMessage('Silakan menginjak pedal kiri terlebih dahulu');
                 return;
             }

             // For subsequent pakans: check if right pedal has been pressed after previous pakan
             if (this.pakanCount > 0 && this.expectingRightPedal && !this.rightPedalPressed) {
                 // Show popup message
                 this.showMessage('Silakan menginjak pedal kanan terlebih dahulu');
                 return;
             }

             // If requirements are met, show the pakan thread with animation
             this.showPakanThread();

             // Reset pedal pressed state after using it
             if (this.pakanCount > 0) {
                 this.rightPedalPressed = false;
             } else {
                 this.leftPedalPressed = false;
             }
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

        // Store the thread thickness for later use
        this.threadThickness = threadThickness;
        this.pakanThreadWidth = totalWidth;
        this.startX = startX; // Store start X position of vertical threads
        this.endX = startX + ((totalThreads - 1) * spacing); // Store end X position of vertical threads

        // Array to store multiple pakan threads
        this.pakanThreads = [];
        this.pakanCount = 0;
        this.maxPakan = 75; // Maximum number of pakan threads

        // Initialize pedal state tracking
        this.leftPedalPressed = false;
        this.rightPedalPressed = false;
        this.expectingRightPedal = false; // Track if we expect the right pedal to be pressed next
    }

    showPakanThread() {
        if (this.pakanCount >= this.maxPakan) {
            this.showMessage('Jumlah maksimal benang pakan telah tercapai');
            return;
        }

        // Determine the Y position based on the current pakan count
        const pakanY = (this.scale.height - 100) - (this.pakanCount * 8); // 8 pixels spacing between threads

        // Check if we need to create a new thread or use an existing one
        let pakanThread;
        if (this.pakanCount < this.pakanThreads.length) {
            pakanThread = this.pakanThreads[this.pakanCount];
        } else {
            // Create a new pakan thread
            pakanThread = this.add.rectangle(
                this.scale.width / 2, // x position (center horizontally)
                pakanY, // y position based on count
                this.pakanThreadWidth, // width (same as total width of vertical threads)
                this.threadThickness, // height (same as vertical thread thickness)
                0xffffff // White color
            );
            pakanThread.setVisible(false);
            this.pakanThreads.push(pakanThread);
        }

        // Update the thread's position
        pakanThread.y = pakanY;

        // Make the thread visible
        pakanThread.setVisible(true);

        // Position it and adjust width based on direction
        if (this.pakanCount % 2 === 0) {
            // Even pakan count (first, third, fifth, etc.) - animate from right to left
            pakanThread.x = this.scale.width + pakanThread.displayWidth/2;

            // Animate the thread moving from right to left
            this.tweens.add({
                targets: pakanThread,
                x: this.startX + this.pakanThreadWidth/2, // Move to center between vertical threads
                duration: 1000, // Animation duration in milliseconds
                ease: 'Power2' // Smooth easing
            });
        } else {
            // Odd pakan count (second, fourth, sixth, etc.) - animate from left to right
            pakanThread.x = -pakanThread.displayWidth/2;

            // Animate the thread moving from left to right
            this.tweens.add({
                targets: pakanThread,
                x: this.startX + this.pakanThreadWidth/2, // Move to center between vertical threads
                duration: 1000, // Animation duration in milliseconds
                ease: 'Power2' // Smooth easing
            });
        }

        // Increment pakan count
        this.pakanCount++;

        // Set state to expect right pedal for next pakan (if this is the first one)
        if (this.pakanCount === 1) {
            this.expectingRightPedal = true;
        } else if (this.pakanCount > 1) {
            // For subsequent pakans, toggle expectation
            this.expectingRightPedal = !this.expectingRightPedal;
        }
    }

    // Method to show message popup
    showMessage(message) {
        // Create background overlay (semi-transparent)
        const overlay = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000, 0.7);
        overlay.setInteractive();

        // Create message box
        const messageBox = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 400, 120, 0x2a2a2a);
        messageBox.setStrokeStyle(3, 0x7b3ff2);

        // Create message text
        const messageText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 20, message, {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            align: 'center',
            wordWrap: { width: 350 }
        });
        messageText.setOrigin(0.5);

        // Create OK button
        const okButton = this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 30, 100, 40, 0x7b3ff2);
        okButton.setInteractive({ useHandCursor: true });
        okButton.setStrokeStyle(2, 0xffffff);

        const okText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 30, 'OK', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: '"Pixelify Sans", Arial, sans-serif',
            align: 'center'
        });
        okText.setOrigin(0.5);

        // Add click functionality to OK button and overlay
        const removeMessage = () => {
            overlay.destroy();
            messageBox.destroy();
            messageText.destroy();
            okButton.destroy();
            okText.destroy();
        };

        okButton.on('pointerdown', removeMessage);
        overlay.on('pointerdown', removeMessage);
    }
}