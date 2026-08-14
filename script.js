function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        let size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
}
createParticles();

let currentPasscode = "";
const targetPasscode = "150806";
const dots = document.querySelectorAll('.dot');

function pressKey(num) {
    if (currentPasscode.length < 6) {
        currentPasscode += num;
        updateDots();
    }
    if (currentPasscode.length === 6) {
        setTimeout(submitPasscode, 200);
    }
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < currentPasscode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function clearPasscode() {
    currentPasscode = "";
    updateDots();
    document.getElementById('error-msg').style.opacity = '0';
}

function submitPasscode() {
    if (currentPasscode === targetPasscode) {
        unlockWebsite();
    } else {
        document.getElementById('error-msg').style.opacity = '1';
        setTimeout(clearPasscode, 800);
    }
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(viewId).classList.add('active-view');
    window.scrollTo(0, 0);
}

function unlockWebsite() {
    switchView('view-transition');
    document.getElementById('flower').classList.add('bloom-anim');
    setTimeout(() => {
        switchView('view-main');
    }, 2400); 
}

let isBlownOut = false;
function blowCandles() {
    const cake = document.getElementById('cake-emoji');
    const msg = document.getElementById('wish-msg');
    if (!isBlownOut) {
        cake.innerText = '🧁'; 
        cake.style.filter = 'drop-shadow(0 0 40px var(--soft-pink))';
        msg.style.display = 'block';
        isBlownOut = true;
    }
}

let catchCount = 0;
function catchHeart() {
    const heart = document.getElementById('floating-heart');
    catchCount++;
    if (catchCount < 3) {
        const maxTop = 75; 
        const maxLeft = 85; 
        heart.style.top = `${Math.random() * maxTop}%`;
        heart.style.left = `${Math.random() * maxLeft}%`;
        heart.style.transform = `scale(${1 - (catchCount * 0.15)})`;
    } else {
        heart.style.display = 'none';
        document.getElementById('game-win-msg').style.display = 'block';
    }
}

// THIS FUNCTION PULLS FROM YOUR LOCAL "photos" FOLDER
function openGallery() {
    const container = document.getElementById('media-container');
    
    // Check if there are actual elements inside
    if (container.children.length === 0) {
        let htmlContent = "";

        // 2 Videos - Now looking inside the 'photos' folder
        for(let v = 1; v <= 2; v++) {
            htmlContent += `
                <div class="media-item">
                    <video controls style="width:100%; border-radius:8px;">
                        <source src="photos/${v}.mp4" type="video/mp4">
                        <p style="text-align:center; padding: 20px;">[Please place '${v}.mp4' in your 'photos' folder]</p>
                    </video>
                    <div class="media-label">Royal Memory (Video ${v})</div>
                </div>
            `;
        }

        // 76 Photos - Now looking inside the 'photos' folder for 1.jpg, 2.jpg, etc.
        for(let i = 1; i <= 75; i++) {
            htmlContent += `
                <div class="media-item">
                    <img src="photos/${i}.jpg" alt="Memory ${i}" loading="lazy" onerror="this.style.display='none'">
                    <div class="media-label">Beautiful Moment ${i}</div>
                </div>
            `;
        }
        container.innerHTML = htmlContent;
    }
    
    // Switch to the gallery view
    switchView('view-gallery');
}