
AOS.init({
    duration: 1000,
    once: true,
});


tsParticles.load("particles-js", {
    background: {
        color: { value: "#0f0f1a" }
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 75,
            density: {
                enable: true,
                area: 800
            }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
            value: 0.3,
            random: true
        },
        size: {
            value: 2,
            random: true
        },
        move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: "out"
        }
    },
    detectRetina: true
});


window.addEventListener("DOMContentLoaded", () => {
    const textWrapper = document.querySelector('.letters');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        anime.timeline({ loop: true })
            .add({
                targets: '.letter',
                translateY: [100, 0],
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 5000,
                delay: (el, i) => 50 * i
            });
    }
});
