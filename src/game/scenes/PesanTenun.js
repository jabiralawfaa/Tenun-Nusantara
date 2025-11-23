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

        // -------------------------
        // BACKGROUND
        // -------------------------
        const bg = this.add.image(centerX, centerY, "background");
        bg.setDisplaySize(this.scale.width, this.scale.height);

        // -------------------------
        // PANEL HITAM TRANSPARAN
        // -------------------------
        const panel = this.add.rectangle(
            centerX, centerY,
            this.scale.width * 0.95,
            this.scale.height * 0.80,
            0x000000,
            0.65
        );
        panel.setStrokeStyle(3, 0xffffff, 0.4);

        // -------------------------
        // TITLE
        // -------------------------
        this.add.text(60, 40, "TENUN NUSANTARA", {
            fontSize: "42px",
            fill: "#ffffff",
            fontFamily: '"Pixelify Sans", Arial',
        });

        this.add.text(60, 100, "Pesan Tenunan Kamu", {
            fontSize: "24px",
            fill: "#ffffff",
            fontFamily: '"Pixelify Sans", Arial',
        });

        // -------------------------
        // CARD KAIN TENUN (SEBELAH KIRI)
        // -------------------------
        const card = this.add.rectangle(250, 320, 260, 300, 0x000000, 0.4)
        card.setStrokeStyle(4, 0x3fa9ff);

        this.add.image(250, 300, "tenun").setScale(0.35);

        this.add.text(160, 420, "Tenun Berkarya", {
            fontSize: "24px",
            fill: "#fff",
            fontFamily: '"Pixelify Sans", Arial',
        });

        // -------------------------
        // FORM INPUT (KANAN)
        // -------------------------
        const formX = 600;
        let y = 130;

        // Label + Input Helper
        const makeLabel = (text, yPos) => {
            return this.add.text(formX - 80, yPos - 35, text, {
                fontSize: "18px",
                fill: "#fff",
                fontFamily: '"Pixelify Sans", Arial',
            })
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

        makeLabel("Atas nama", y);
        this.nameInput = createInput(y);

        y += 90;
        makeLabel("Alamat", y);
        this.addressInput = createInput(y);

        y += 90;
        makeLabel("Nomor Telepon", y);
        this.phoneInput = createInput(y);

        // -------------------------
        // TOMBOL BELI (KANAN BAWAH)
        // -------------------------
        // const beliBtnBg = this.add.rectangle(formX, 430, 140, 45, 0x8a63ff);
        // beliBtnBg.setStrokeStyle(2, 0xffffff);

        const beliBtn = this.add.dom(550, 390, "button");
        beliBtn.node.innerText = "Beli";
        beliBtn.node.style.width = "180px";
        beliBtn.node.style.height = "45px";
        beliBtn.node.style.borderRadius = "8px";
        beliBtn.node.style.border = "none";
        beliBtn.node.style.background = "#b59bff";
        beliBtn.node.style.color = "#000";
        beliBtn.node.style.fontWeight = "bold";
        beliBtn.node.style.fontSize = "18px";
        beliBtn.node.style.cursor = "pointer";

        beliBtn.addListener("click");
        beliBtn.on("click", () => {
            const name = this.nameInput.node.value;
            const address = this.addressInput.node.value;
            const phone = this.phoneInput.node.value;

            alert(`Pesanan berhasil!\nNama: ${name}\nAlamat: ${address}\nTelp: ${phone}`);
        });

        // -------------------------
        // TOMBOL KEMBALI (KIRI BAWAH)
        // -------------------------
        // const kembaliBg = this.add.rectangle(160, 500, 140, 45, 0x8a63ff);
        // kembaliBg.setStrokeStyle(2, 0xffffff);

        const kembaliBtn = this.add.dom(100, 550, "button");
        kembaliBtn.node.innerText = "Kembali";
        kembaliBtn.node.style.width = "140px";
        kembaliBtn.node.style.height = "45px";
        kembaliBtn.node.style.borderRadius = "8px";
        kembaliBtn.node.style.border = "none";
        kembaliBtn.node.style.background = "#b59bff";
        kembaliBtn.node.style.color = "#000";
        kembaliBtn.node.style.fontSize = "18px";
        kembaliBtn.node.style.cursor = "pointer";

        kembaliBtn.addListener("click");
        kembaliBtn.on("click", () => {
            this.scene.start("MainMenu");
        });
    }
}
