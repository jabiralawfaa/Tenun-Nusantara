import Phaser from "phaser";

export class PesanTenun extends Phaser.Scene {
    constructor() {
        super({ key: "PesanTenun" });
    }

    preload() {
        this.load.image("background", "assets/bg.png");
        this.load.image("tenun", "assets/kain-tenun1.png");
        this.load.image("iconBeli", "assets/icon-beli.png"); // opsional
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // BACKGROUND
        const bg = this.add.image(centerX, centerY, "background")
            .setDisplaySize(this.scale.width, this.scale.height);

        // PANEL
        const panel = this.add.rectangle(
            centerX, centerY,
            this.scale.width * 0.95,
            this.scale.height * 0.80,
            0x000000, 0.65
        ).setStrokeStyle(3, 0xffffff, 0.4);

        // TITLE
        const title = this.add.text(60, 40, "TENUN NUSANTARA", {
            fontSize: "42px",
            fill: "#ffffff",
            fontFamily: '"Pixelify Sans", Arial',
        });

        const subtitle = this.add.text(60, 100, "Pesan Tenunan Kamu", {
            fontSize: "24px",
            fill: "#ffffff",
            fontFamily: '"Pixelify Sans", Arial',
        });

        // ==========================
        // DATA PRODUK YANG SUDAH DIPILIH
        // (bisa kamu ganti dari API atau localStorage nanti)
        // ==========================
        const products = [
            { name: "Tenun Berkarya", img: "tenun" },
            { name: "Tenun Nusantara", img: "tenun" },
            { name: "Tenun Premium", img: "tenun" }
        ];

        // Posisi awal tumpukan
        let cardX = 250;
        let startY = 240;

        // Jarak antar card (semakin kecil semakin tumpuk)
        let stackGap = 85;

        products.forEach((p, i) => {
            const cardY = startY + (i * stackGap);

            // CARD BG
            const card = this.add.rectangle(cardX, cardY, 260, 120, 0x000000, 0.45);
            card.setStrokeStyle(3, 0x3fa9ff);

            // GAMBAR KECIL (BIAR MUAT DALAM STACK)
            const img = this.add.image(cardX - 80, cardY, p.img).setScale(0.15);

            // NAMA PRODUK
            const nameText = this.add.text(cardX - 20, cardY - 20, p.name, {
                fontSize: "20px",
                fill: "#fff",
                fontFamily: '"Pixelify Sans", Arial',
            });

            // HARGA
            const priceText = this.add.text(cardX - 20, cardY + 10, p.price, {
                fontSize: "18px",
                fill: "#3fa9ff",
                fontFamily: '"Pixelify Sans", Arial',
            });

            // ======================
            // ANIMASI MASUK STACK CARD
            // ======================
            const elements = [card, img, nameText, priceText];

            elements.forEach((el) => {
                el.setAlpha(0);
                el.y += 40;

                this.tweens.add({
                    targets: el,
                    alpha: 1,
                    y: "-=40",
                    delay: i * 150,
                    duration: 600,
                    ease: "Back.easeOut"
                });
            });
        });



        // -------------------------
        // FORM
        // -------------------------
        const formX = 600;
        let y = 130;

        const makeLabel = (text, yPos) => {
            return this.add.text(formX - 80, yPos - 35, text, {
                fontSize: "18px",
                fill: "#fff",
                fontFamily: '"Pixelify Sans", Arial',
            });
        };

        const createInput = (yPos) => {
            const input = this.add.dom(formX, yPos, "input");
            input.node.style.width = "580px";
            input.node.style.height = "34px";
            input.node.style.borderRadius = "8px";
            input.node.style.border = "2px solid #fff";
            input.node.style.background = "#ffffffcc";
            input.node.style.fontSize = "16px";
            input.node.style.padding = "6px 10px";
            return input;
        };

        const label1 = makeLabel("Atas nama", y);
        this.nameInput = createInput(y);

        y += 90;
        const label2 = makeLabel("Alamat", y);
        this.addressInput = createInput(y);

        y += 90;
        const label3 = makeLabel("Nomor Telepon", y);
        this.phoneInput = createInput(y);

        // -------------------------
        // TOMBOL BELI
        // -------------------------
        const beliX = 600;
        const beliY = 460;

        const beliButton = this.add.rectangle(beliX, beliY, 180, 50, 0x7b3ff2)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xffffff)
            .setInteractive({ useHandCursor: true });

        const beliText = this.add.text(beliX, beliY, "Beli", {
            fontFamily: '"Pixelify Sans", Arial',
            fontSize: "18px",
            color: "#ffffff"
        }).setOrigin(0.5);

        beliButton.on("pointerdown", () => {
            alert(`Pesanan berhasil!\nNama: ${this.nameInput.node.value}\nAlamat: ${this.addressInput.node.value}\nTelp: ${this.phoneInput.node.value}`);
        });

        // -------------------------
        // TOMBOL KEMBALI
        // -------------------------
        const kembaliX = 180;
        const kembaliY = 560;

        const kembaliButton = this.add.rectangle(kembaliX, kembaliY, 180, 50, 0x7b3ff2)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xffffff)
            .setInteractive({ useHandCursor: true });

        const kembaliText = this.add.text(kembaliX, kembaliY, "Kembali", {
            fontFamily: '"Pixelify Sans", Arial',
            fontSize: "18px",
            color: "#ffffff"
        }).setOrigin(0.5);

        kembaliButton.on("pointerdown", () => {
            this.scene.start("TenunanKamu");
        });

        // =========================
        // KUMPULKAN SEMUA ELEMEN YANG VALID
        // =========================
        let animTargets = [
            panel, title, subtitle,
            label1, this.nameInput,
            label2, this.addressInput,
            label3, this.phoneInput,
            beliButton, beliText,
            kembaliButton, kembaliText
        ];


        // =========================
        // ANIMASI (FADE + SLIDE UP)
        // =========================
        animTargets.forEach((el, i) => {
            if (!el) return;
            el.setAlpha(0);
            el.y += 40;

            this.tweens.add({
                targets: el,
                alpha: 1,
                y: "-=40",
                duration: 600,
                delay: i * 70,
                ease: "Back.easeOut"
            });
        });
    }
}
