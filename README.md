## **Deskripsi dan Alur Web Game "Tenun Nusantara"**

### **Deskripsi Aplikasi**
"Tenun Nusantara" adalah web game edukatif berbasis browser yang mengajak pengguna untuk mempelajari sejarah dan proses pembuatan kain tenun tradisional Indonesia menggunakan alat tenun gedogan. Game ini menggabungkan elemen pembelajaran budaya, simulasi interaktif, dan fitur e-commerce, memungkinkan pengguna tidak hanya belajar tentang warisan budaya Indonesia tetapi juga dapat memesan hasil tenun asli yang mereka buat secara virtual.

### **Alur Permainan**

#### **1. Halaman Pembelajaran Sejarah**
- Pengguna memulai dengan menjelajahi galeri sejarah tenun Indonesia
- Menampilkan informasi tentang berbagai jenis tenun (Ulos, Songket, Ikat, dll) dari berbagai daerah
- Dilengkapi dengan ilustrasi 2D, narasi audio, dan mini-game kuis sejarah
- Pengguna mendapatkan poin budaya yang bisa ditukar dengan bahan tenun virtual

#### **2. Pembuatan Pola Desain**
- Pengguna memilih jenis tenun yang ingin dibuat (Baduy, Dermayon, dll)
- Menggunakan alat desain digital untuk membuat motif tenun:
  - Pemilihan warna tradisional (alami dari tumbuhan)
  - Pembuatan pola geometris atau simbolik sesuai budaya daerah
  - Preview real-time dari desain yang dibuat
- Sistem memberikan rekomendasi berdasarkan pola tradisional otentik

#### **3. Persiapan Benang**
- **Benang Lungsin (Lusi):** Pengguna mengatur benang lungsin secara vertikal pada alat gedogan virtual
  - Memilih jenis benang (kapas, sutra, atau serat alam)
  - Mengatur ketegangan dan pola dasar 
- **Benang Pakan:** Pengguna menyiapkan benang pakan yang akan dianyamkan secara horizontal
  - Pemilihan warna sesuai desain yang telah dibuat
  - Pengaturan jumlah gulungan benang untuk estimasi waktu menenun

#### **4. Proses Menenun dengan Gedogan**
- Simulasi interaktif alat tenun gedogan dengan posisi duduk di lantai 
- Alat gedogan ditampilkan dalam posisi dipangku/digendong dengan visual 2D yang akurat 
- Mekanisme permainan:
  - Pengguna mengklik tombol "Benang Lungsin" untuk mengangkat benang lusi
  - Lalu mengklik tombol "Benang Pakan" untuk memasukkan benang pakan secara bergantian
  - Setiap klik yang tepat menghasilkan anyaman yang sempurna
  - Sistem memberikan feedback visual dan audio untuk setiap gerakan
  - Proses ini mensimulasikan teknik menenun yang menganyam benang pakan pada benang lusi 
- Mini-game timing untuk menambah tantangan dan edukasi tentang kesabaran dalam menenun tradisional

#### **5. Penyelesaian dan Pemesanan**
- Setelah selesai, pengguna dapat melihat hasil tenun virtual mereka
- Opsi untuk:
  - Menyimpan desain sebagai koleksi digital
  - Berbagi ke media sosial
  - **Memesan versi fisik** dari hasil tenun yang sama dari pengrajin mitra
- Integrasi sistem e-commerce sederhana untuk pemesanan kain tenun asli

### **Rekomendasi Teknologi**

#### **Bahasa Pemrograman Utama:**
- **JavaScript/ES6+** sebagai bahasa inti untuk logika game dan interaktivitas
- **HTML5 & CSS3** untuk struktur halaman dan styling antarmuka

#### **Framework & Library yang Direkomendasikan:**

**1. Phaser 3 (Primary Recommendation)**
- Phaser adalah framework game 2D paling populer untuk HTML5 yang sangat cocok untuk game berfitur lengkap seperti Tenun Nusantara 
- Menyediakan sistem scene management yang sempurna untuk mengatur alur dari pembelajaran hingga proses menenun 
- Memiliki built-in physics engine yang bisa disesuaikan untuk simulasi gerakan benang
- Mendukung mobile-first development dengan responsive design yang baik

#### **Teknologi Pendukung:**
- **Webpack/Vite** untuk bundling dan optimization
- **GSAP** untuk animasi UI yang smooth
- **Howler.js** untuk sound effects dan narasi audio
- **Firebase/Node.js + MongoDB** untuk backend (user data, desain penyimpanan, e-commerce integration)
- **Responsive Design** dengan CSS Grid/Flexbox untuk kompatibilitas mobile dan desktop

### **Style Visual (2D)**
- **Art Style:** Flat design dengan sentuhan ilustrasi tradisional Indonesia
- **Color Palette:** Menggunakan warna-warna tradisional khas tenun Indonesia (merah, emas, hitam, dan warna alami)
- **UI/UX:** Minimalis dengan elemen-elemen budaya yang kental, menggunakan pola tenun sebagai border dan background elements
- **Character Design:** Karakter 2D sederhana dalam posisi duduk menenun dengan alat gedogan 

Dengan kombinasi teknologi yang tepat dan alur permainan yang edukatif, "Tenun Nusantara" akan menjadi platform yang efektif untuk melestarikan budaya tenun Indonesia sambil memberikan pengalaman interaktif yang menarik bagi generasi muda.
