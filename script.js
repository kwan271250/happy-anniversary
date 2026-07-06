/**
 * ==========================================================================
 * 🚀 HAPPY ANNIVERSARY - MAIN JAVASCRIPT ENGINE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- [1. GLOBAL SETTINGS & INITIALIZATION] ---
    const CONFIG = {
        startDate: new Date('2024-02-06T00:00:00'), // วันที่ 06/02/2567
        starCount: 520, // จำนวนดาวมากกว่า 500 ดวง
        sakuraCount: 25,
        heartCount: 15,
        typingSpeed: 70,
        loveLetter: "ตั้งแต่วันแรกที่เราตกลงคบกันในวันที่ 6 กุมภาพันธ์ 2567 จนถึงวันนี้... ทุกช่วงเวลามีค่ามากสำหรับเค้านะ ขอบคุณที่เป็นความสุข เป็นรอยยิ้ม และอยู่ข้างๆ กันเสมอมา ขอให้เราจับมือกันแน่นๆ แบบนี้ รักเธอที่สุดในโลกเลยนะ ยูว์ ❤️"
    };

    // DOM Cache
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const typingTextEl = document.getElementById('typing-text');
    const memoryBook = document.getElementById('memory-book');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    let isMusicPlaying = false;
    let hasTyped = false;
    let currentPage = 1;
    const totalPages = document.querySelectorAll('.book .page').length;

    // --- [2. LOADING SYSTEM WITH PROGRESS] ---
    function initLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    // เริ่มระบบคำนวณเวลาทันทีหลังจากโหลดเสร็จ
                    setInterval(updateLoveCounter, 1000);
                    updateLoveCounter();
                }, 400);
            }
            progressFill.style.width = `${progress}%`;
        }, 80);
    }
    initLoading();

    // --- [3. MUSIC SYSTEM] ---
    musicBtn.addEventListener('click', toggleMusic);
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(err => console.log("Audio autoplay prevented. Playing on user interaction."));
            musicBtn.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    }

    // --- [4. LOVE COUNTER ENGINE] ---
    function updateLoveCounter() {
        const now = new Date();
        const diffMs = now - CONFIG.startDate;

        if (diffMs < 0) return; // การป้องกันกรณีตั้งค่าเวลาผิดพลาด

        // คำนวณหาจำนวน วัน, ชั่วโมง, นาที, วินาที ทั้งหมดแบบละเอียด
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        // แสดงผลสู่หน้าเว็บพร้อมเติมเลข 0 ข้างหน้ากรณีหลักเดียว
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // --- [5. TEXT TYPING SYSTEM] ---
    function typeWriter(text, index) {
        if (index < text.length) {
            typingTextEl.innerHTML += text.charAt(index);
            setTimeout(() => typeWriter(text, index + 1), CONFIG.typingSpeed);
        }
    }

    // --- [6. ENVELOPE INTERACTION] ---
    envelopeWrapper.addEventListener('click', () => {
        if (!envelopeWrapper.classList.contains('open')) {
            envelopeWrapper.classList.add('open');
            // ยิงพลุฉลองเมื่อกดเปิดจดหมายครั้งแรก
            fireworksEngine.spawnBatch(5);
            
            if (!hasTyped) {
                hasTyped = true;
                setTimeout(() => {
                    typeWriter(CONFIG.loveLetter, 0);
                }, 600);
            }
            
            // เปิดเพลงให้อัตโนมัติเมื่อกดเปิดจดหมาย (หากยังไม่เปิด)
            if (!isMusicPlaying) toggleMusic();
        } else {
            envelopeWrapper.classList.remove('open');
        }
    });

    // --- [7. FLIP MEMORY BOOK SYSTEM] ---
    const pages = document.querySelectorAll('.book .page');
    
    function updateBookButtons() {
        prevPageBtn.disabled = (currentPage === 1);
        nextPageBtn.disabled = (currentPage === totalPages);
    }

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            const currentEl = document.querySelector(`.page[data-page="${currentPage}"]`);
            currentEl.classList.remove('active');
            currentEl.classList.add('flipped');
            
            currentPage++;
            
            const nextEl = document.querySelector(`.page[data-page="${currentPage}"]`);
            nextEl.classList.add('active');
            
            updateBookButtons();
            // เอฟเฟกต์ Confetti โปรยเล็กๆ เมื่อเปิดหน้าถัดไป
            fireworksEngine.spawnConfettiBatch(15);
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            const currentEl = document.querySelector(`.page[data-page="${currentPage}"]`);
            currentEl.classList.remove('active');
            
            currentPage--;
            
            const prevEl = document.querySelector(`.page[data-page="${currentPage}"]`);
            prevEl.classList.remove('flipped');
            prevEl.classList.add('active');
            
            updateBookButtons();
        }
    });

    // --- [8. POLAROID GALLERY & LIGHTBOX MODAL] ---
    document.querySelectorAll('.polaroid-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.gallery-img');
            const caption = card.querySelector('.polaroid-caption').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightboxModal.classList.add('show');
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });

    function closeLightbox() {
        lightboxModal.classList.remove('show');
    }

    // คลิกที่หัวใจดวงโตเพื่อจุดพลุเร่งด่วนได้ด้วย!
    document.querySelector('.heart-pulse').addEventListener('click', () => {
        fireworksEngine.spawnBatch(3);
    });


    /**
     * ==========================================================================
     * 🌌 9. 3D GALAXY, STARS & NATURAL PARTICLES ENGINE (CANVAS 1)
     * ==========================================================================
     */
    const galaxyCanvas = document.getElementById('galaxy-canvas');
    const gCtx = galaxyCanvas.getContext('2d');
    
    let stars = [];
    let shootingStars = [];
    let sakuras = [];
    let hearts = [];

    function resizeGalaxyCanvas() {
        galaxyCanvas.width = window.innerWidth;
        galaxyCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeGalaxyCanvas);
    resizeGalaxyCanvas();

    // Particle Classes
    class Star {
        constructor() {
            this.reset();
            this.y = Math.random() * galaxyCanvas.height; // สุ่มกระจายเต็มจอตอนเริ่ม
        }
        reset() {
            this.x = Math.random() * galaxyCanvas.width;
            this.y = 0;
            this.z = Math.random() * galaxyCanvas.width; // 3D Depth
            this.size = Math.random() * 1.5 + 0.5;
            this.color = ['#fff', '#f4e8ff', '#ffd3e8', '#e0aaff'][Math.floor(Math.random() * 4)];
            this.alpha = Math.random();
            this.alphaSpeed = Math.random() * 0.02 + 0.005;
        }
        update() {
            // จำลองการเคลื่อนไหวแบบมีมิติ (3D Cosmic Flow)
            this.alpha += this.alphaSpeed;
            if (this.alpha > 1 || this.alpha < 0) {
                this.alphaSpeed = -this.alphaSpeed;
            }
        }
        draw() {
            gCtx.save();
            gCtx.globalAlpha = this.alpha;
            gCtx.fillStyle = this.color;
            gCtx.shadowBlur = 5;
            gCtx.shadowColor = this.color;
            gCtx.beginPath();
            gCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            gCtx.fill();
            gCtx.restore();
        }
    }

    class ShootingStar {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * galaxyCanvas.width;
            this.y = Math.random() * (galaxyCanvas.height / 2);
            this.length = Math.random() * 80 + 40;
            this.speed = Math.random() * 12 + 8;
            this.angle = Math.PI / 4; // เอียง 45 องศา
            this.active = Math.random() < 0.001; // อัตราการเกิดดาวตกแบบนุ่มนวล
        }
        update() {
            if (!this.active) {
                if (Math.random() < 0.001) this.active = true;
                return;
            }
            this.x -= this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            if (this.x < -this.length || this.y > galaxyCanvas.height + this.length) {
                this.reset();
            }
        }
        draw() {
            if (!this.active) return;
            gCtx.save();
            let gradient = gCtx.createLinearGradient(this.x, this.y, this.x + this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 101, 163, 0.4)');
            gradient.addColorStop(1, 'rgba(157, 78, 221, 0)');
            gCtx.strokeStyle = gradient;
            gCtx.lineWidth = 2;
            gCtx.beginPath();
            gCtx.moveTo(this.x, this.y);
            gCtx.lineTo(this.x + this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
            gCtx.stroke();
            gCtx.restore();
        }
    }

    class Sakura {
        constructor() { this.reset(); this.y = Math.random() * galaxyCanvas.height; }
        reset() {
            this.x = Math.random() * galaxyCanvas.width;
            this.y = -20;
            this.size = Math.random() * 6 + 4;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.4 + 0.4;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y / 30) * 0.3;
            this.rotation += this.rotationSpeed;
            if (this.y > galaxyCanvas.height + 20) this.reset();
        }
        draw() {
            gCtx.save();
            gCtx.translate(this.x, this.y);
            gCtx.rotate(this.rotation * Math.PI / 180);
            gCtx.globalAlpha = this.opacity;
            gCtx.fillStyle = '#ffb3c6';
            // วาดกลีบซากุระรูปวงรีดัดโค้ง
            gCtx.beginPath();
            gCtx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
            gCtx.fill();
            gCtx.restore();
        }
    }

    class FloatingHeart {
        constructor() { this.reset(); this.y = galaxyCanvas.height + Math.random() * 200; }
        reset() {
            this.x = Math.random() * galaxyCanvas.width;
            this.y = galaxyCanvas.height + 20;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 0.8 + 0.4;
            this.swingSpeed = Math.random() * 0.02 + 0.01;
            this.swingRange = Math.random() * 30 + 10;
            this.swingSeed = Math.random() * 100;
            this.opacity = Math.random() * 0.3 + 0.4;
        }
        update() {
            this.y -= this.speedY;
            this.swingSeed += this.swingSpeed;
            this.x += Math.sin(this.swingSeed) * 0.5;
            if (this.y < -20) this.reset();
        }
        draw() {
            gCtx.save();
            gCtx.translate(this.x, this.y);
            gCtx.globalAlpha = this.opacity;
            gCtx.fillStyle = '#ff4d6d';
            // วาดโครงสร้างรูปหัวใจเวกเตอร์ทางคณิตศาสตร์
            gCtx.beginPath();
            gCtx.moveTo(0, 0);
            gCtx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, -this.size/3, -this.size, this.size/3);
            gCtx.bezierCurveTo(-this.size, this.size, -this.size/3, this.size*1.3, 0, this.size*1.7);
            gCtx.bezierCurveTo(this.size/3, this.size*1.3, this.size, this.size, this.size, this.size/3);
            gCtx.bezierCurveTo(this.size, -this.size/3, this.size/2, -this.size/2, 0, 0);
            gCtx.closePath();
            gCtx.fill();
            gCtx.restore();
        }
    }

    // Spawn Pool
    for (let i = 0; i < CONFIG.starCount; i++) stars.push(new Star());
    for (let i = 0; i < 4; i++) shootingStars.push(new ShootingStar());
    for (let i = 0; i < CONFIG.sakuraCount; i++) sakuras.push(new Sakura());
    for (let i = 0; i < CONFIG.heartCount; i++) hearts.push(new FloatingHeart());

    // Loop Dynamic Background Animation
    function animateBackground() {
        gCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
        
        stars.forEach(s => { s.update(); s.draw(); });
        shootingStars.forEach(ss => { ss.update(); ss.draw(); });
        sakuras.forEach(sk => { sk.update(); sk.draw(); });
        hearts.forEach(h => { h.update(); h.draw(); });

        requestAnimationFrame(animateBackground);
    }
    animateBackground();


    /**
     * ==========================================================================
     * 🎆 10. FIREWORKS & CONFETTI CELEBRATION ENGINE (CANVAS 2)
     * ==========================================================================
     */
    class FireworksEngine {
        constructor() {
            this.canvas = document.getElementById('fx-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.confettis = [];
            
            window.addEventListener('resize', () => this.resize());
            this.resize();
            this.loop();
        }
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        spawnBatch(count) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const x = Math.random() * (this.canvas.width * 0.6) + (this.canvas.width * 0.2);
                    const y = Math.random() * (this.canvas.height * 0.4) + (this.canvas.height * 0.15);
                    const hue = Math.random() * 60 + 300; // เฉดสีชมพู-ม่วง-บานเย็น
                    this.createExplosion(x, y, hue);
                }, i * 350);
            }
        }
        createExplosion(x, y, hue) {
            const pCount = 60;
            for (let i = 0; i < pCount; i++) {
                const angle = (Math.PI * 2 / pCount) * i + Math.random() * 0.5;
                const speed = Math.random() * 5 + 2;
                this.particles.push({
                    x: x, y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    decay: Math.random() * 0.015 + 0.01,
                    hue: hue + Math.floor(Math.random() * 30 - 15)
                });
            }
        }
        spawnConfettiBatch(count) {
            for(let i=0; i<count; i++) {
                this.confettis.push({
                    x: Math.random() * this.canvas.width,
                    y: -20,
                    size: Math.random() * 6 + 4,
                    color: ['#ff65a3', '#9d4edd', '#f4d068', '#fff'][Math.floor(Math.random()*4)],
                    vx: Math.random() * 4 - 2,
                    vy: Math.random() * 3 + 2,
                    rotation: Math.random() * 360,
                    rSpeed: Math.random() * 4 - 2
                });
            }
        }
        loop() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Render Fireworks
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.04; // Gravity แรงโน้มถ่วงพลุตกดิน
                p.alpha -= p.decay;
                
                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }
                
                this.ctx.save();
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = `hsl(${p.hue}, 100%, 65%)`;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }

            // Render Confettis
            for (let i = this.confettis.length - 1; i >= 0; i--) {
                const c = this.confettis[i];
                c.x += c.vx;
                c.y += c.vy;
                c.rotation += c.rSpeed;
                
                if (c.y > this.canvas.height + 20) {
                    this.confettis.splice(i, 1);
                    continue;
                }
                
                this.ctx.save();
                this.ctx.translate(c.x, c.y);
                this.ctx.rotate(c.rotation * Math.PI / 180);
                this.ctx.fillStyle = c.color;
                this.ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
                this.ctx.restore();
            }
            
            requestAnimationFrame(() => this.loop());
        }
    }
    
    const fireworksEngine = new FireworksEngine();
});