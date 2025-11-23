import { Scene } from 'phaser';

export class TenunanKamu2 extends Scene {
    constructor() {
        super("TenunanKamu2");
    }

    preload() {
        this.load.image("bg", "assets/bg.png");
        this.load.image("kain", "assets/kain-tenun1.png");
        this.load.image("alatTenun", "assets/pixel/alat-tenun.png");
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        // Background full screen
        this.add.image(W / 2, H / 2, "bg")
            .setDisplaySize(W, H)
            .setOrigin(0.5);

        // Semi-dark overlay seperti di gambar
        this.add.rectangle(0, 0, W * 2, H * 2, 0x000000, 0.25)
            .setOrigin(0);

        // TITLE “TENUN NUSANTARA”
        this.add.text(40, 25, "TENUN NUSANTARA", {
            fontSize: "42px",
            fontFamily: "Pixelify Sans",
            color: "#ffffff",
            stroke: "#000",
            strokeThickness: 6
        });

        // SUBTITLE “Tenunan Kamu”
        this.add.text(40, 100, "Tenunan Kamu", {
            fontSize: "46px",
            fontFamily: "Pixelify Sans",
            color: "#ffffff"
        });

        // Panel hitam transparan (tempat kartu)
        const panelY = 150;
        // PANEL besar full width (background gelap transparan di tengah)
        const panelHeight = 360;

        const panel = this.add.rectangle(
            W / 2,
            panelY + panelHeight / 2,
            W,               // FULL WIDTH
            panelHeight,     // lebih tinggi biar lega
            0x000000,
            0.45             // lebih gelap biar elemen keliatan
        ).setOrigin(0.5).setStrokeStyle(2, 0x222222);;


        // DATA TENUN
        const dataTenun = [
            { name: "tenun pertama", img: "kain" },
            { name: "tenun kedua", img: "kain" },
            { name: "tenun ketiga", img: "kain" },
            { name: "tenun keempat", img: "kain" },
            { name: "tenun kelima", img: "kain" },
        ];

        // Posisi awal kartu
        const startX = W / 2 - 500;
        const gapX = 300;
        const y = panelY + 90;

        dataTenun.forEach((item, i) => {
            const x = startX + i * gapX;

            // Card (kotak hitam)
            const card = this.add.rectangle(x, y + 50, 260, 260, 0x000000, 0.45)
                .setOrigin(0.5)
                .setStrokeStyle(2, 0x333333);

            // Gambar tenun
            const img = this.add.image(x, y + 10, item.img)
                .setScale(0.35)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });

            img.on("pointerup", () => {
                this.scene.start("Game", { tenun: item.name });
            });

            // Nama tenun
            const label = this.add.text(x, y + 135, item.name, {
                fontSize: "32px",
                fontFamily: "Pixelify Sans",
                color: "#ffffff",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 4,
            }).setOrigin(0.5);

        });

        // Tombol Kembali
        const btnBack = this.makeButton(60, H - 60, "Kembali", () => {
            this.scene.start("MainMenu");
        });

        // Tombol Buat Tenun Baru
        const btnBuatTenun = this.makeButton(W - 30, H - 60, "Buat Tenun baru", () => {
            this.scene.start("Game");
        }, true);

        // Tambahkan ikon khusus untuk tombol Buat Tenun Baru
        const iconNew = this.add.image(
            btnBuatTenun.btn.x - 30,
            btnBuatTenun.btn.y + 20,
            "alatTenun"
        ).setScale(0.10).setOrigin(0.5);

    }

    // 🔵 Reusable Button Builder
    makeButton(x, y, text, onClick, alignRight = false) {
        const radius = 12; // tingkat lengkungan
        const width = 180;
        const height = 50;

        // posisi origin
        const originX = alignRight ? 1 : 0;

        // gambar rounded rectangle
        const graphics = this.add.graphics();
        graphics.fillStyle(0x6644cc, 1);
        graphics.fillRoundedRect(
            x - width * originX,  // posisi mengikuti alignRight
            y - height / 2,
            width,
            height,
            radius
        );

        // bikin hitbox interaktif
        const btn = this.add.rectangle(
            x - width * originX,
            y - height / 2,
            width,
            height,
            0x000000,
            0
        )
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true });

        // label text
        const label = this.add.text(
            x + (alignRight ? -10 : 10),
            y,
            text,
            {
                fontFamily: "Pixelify Sans",
                fontSize: "20px",
                color: "#ffffff"
            }
        ).setOrigin(alignRight ? 1 : 0, 0.5);

        // interaksi hover
        btn.on("pointerover", () => {
            graphics.clear();
            graphics.fillStyle(0x7a5eff, 1);
            graphics.fillRoundedRect(
                x - width * originX,
                y - height / 2,
                width,
                height,
                radius
            );
        });

        btn.on("pointerout", () => {
            graphics.clear();
            graphics.fillStyle(0x6644cc, 1);
            graphics.fillRoundedRect(
                x - width * originX,
                y - height / 2,
                width,
                height,
                radius
            );
        });

        btn.on("pointerup", onClick);

        return { graphics, btn, label };
    }

}
