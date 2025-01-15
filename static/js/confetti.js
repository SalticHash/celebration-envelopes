Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
}

// this is max
// that is min
Number.prototype.random = function(that = 0) {
    return Math.floor(Math.random() * (this - that + 1) + that);
}

//Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let style = Number(canvas.dataset.style);
const assets = [
    {filename: "confetti.svg", w: 24, h: 24},
    {filename: "mortarboard.svg", w: 32, h: 32},
    {filename: "gift.svg", w: 28, h: 28},
    {filename: "heart.svg", w: 28, h: 28},
    {filename: "ornament.svg", w: 42, h: 42},
    {filename: "jack.svg", w: 42, h: 42},
    {filename: "cowfetti.svg", w: 42, h: 42},
    {filename: "antRain.svg", w: 42, h: 42}
]
const asset = assets[Number(canvas.dataset.type)];
let colors = canvas.dataset.colors;
colors = JSON.parse(colors);

let images = []
colors.forEach((color) => {
    const image = new Image(asset.w, asset.h)

    fetch(`/static/assets/confetti/${asset.filename}`)
        .then((response) => response.text())
        .then((svgText) => {
            // Modify the SVG markup to set the fill color
            const modifiedSvgText = svgText.replace(/fill="[^"]*"/g, `fill="${color}"`);

            // Convert the modified SVG back to a data URL
            const encodedSvg = encodeURIComponent(modifiedSvgText);
            const dataUrl = "data:image/svg+xml," + encodedSvg;

            // Set the data URL as the image source
            image.src = dataUrl;
        })
        .catch((error) => {
            console.error("Failed to load the SVG image.", error);
        });

    let imageDict = {
        file: image,
        centerW: image.width / 2,
        centerH: image.height / 2
    }

    images.push(imageDict)
})

class Particle {
    constructor(x = 0, y = 0, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.img = images.random();

        this.angle = 0.0;
        this.iangle = Math.floor(Math.random() * Math.PI);
    }

    draw() {
        ctx.save();
        ctx.translate(
            this.x + this.img.centerW,
            this.y + this.img.centerH
        );
        ctx.rotate(this.angle + this.iangle);
        ctx.translate(
            -this.x - this.img.centerW,
            -this.y - this.img.centerH
        );

        ctx.drawImage(this.img.file, this.x, this.y);

        ctx.restore();
    }

    update(delta) {
        this.vy += 0.1;
        this.vx *= 0.98;

        this.x += this.vx * delta;
        this.y += this.vy;

        this.angle += ((Math.abs(this.vy) + 5) / 100) * delta;
    }

    reset(x = 0, y = 0, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.img = images.random();

        this.angle = 0.0;
        this.iangle = Math.floor(Math.random() * Math.PI);
    }
}

function addParticle(x = 0, y = 0, vx = 0, vy = 0) {
    setTimeout(() => {
        particles.push(new Particle(x, y, vx, vy));
    }, (5000).random())
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function resetParticle(particle) {
    switch (style) {
        case 1: // Rain
            particle.reset(canvas.width.random(), -50)
            break;

        case 2: // Showers
            if ((1).random() == 1) {
                particle.reset(10, -20, (10).random(-1));
            } else {
                particle.reset(canvas.width - 10, -20, (-10).random(1));
            }
            break;

        case 3: // Jump
            particle.reset(canvas.width.random(), canvas.height + 20, 0, (-15).random());
            break;

        case 4: // Poppers
            if ((1).random() == 1) {
                particle.reset(10, canvas.height + 20, (10).random(), (-10).random());
            } else {
                particle.reset(canvas.width - 10, canvas.height + 20, (-10).random(), (-10).random());
            }
            break;
    }
}

const particles = [];

let lastTimestamp = 0;


for (let i = 0; i < 100; i++) {
    switch (style) {
        case 1: // Rain
            addParticle(canvas.width.random(), -40);
            break;

        case 2: // Showers
            addParticle(10, -20, (10).random(-1));
            addParticle(canvas.width - 10, -20, (-10).random(1));
            break;

        case 3: // Jump
            addParticle(canvas.width.random(), canvas.height + 20, 0, (-15).random());
            break;

        case 4: // Poppers
            addParticle(10, canvas.height + 20, (10).random(), (-10).random());
            addParticle(canvas.width - 10, canvas.height + 20, (-10).random(), (-10).random());
            break;
    }
}

window.requestAnimationFrame(drawParticles);
function drawParticles(timestamp) {
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        particle.draw();
        particle.update(delta * 0.05);
        if (particle.y > canvas.height + 50) {
            resetParticle(particle)
        }
    }

    window.requestAnimationFrame(drawParticles);
}