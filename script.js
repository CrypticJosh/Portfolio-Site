/* ---------------------------------------------
   AUTO‑HEIGHT FOR FLIP CONTAINERS
--------------------------------------------- */
function updateHeights() {
    document.querySelectorAll('.flip-container').forEach(container => {
        const front = container.querySelector('.card-front');
        const back = container.querySelector('.card-back');

        // Measure tallest side
        const maxHeight = Math.max(front.offsetHeight, back.offsetHeight);

        container.style.height = maxHeight + "px";
        container.querySelector('.card-inner').style.height = maxHeight + "px";
    });
}

window.addEventListener("load", updateHeights);
window.addEventListener("resize", updateHeights);


/* ---------------------------------------------
   FLIP LOGIC
--------------------------------------------- */
document.querySelectorAll('.flip-container').forEach(container => {
    const inner = container.querySelector('.card-inner');
    const flipBtn = container.querySelector('.flip-btn');
    const backBtn = container.querySelector('.flip-back-btn');
    const frontCard = container.querySelector('.card-front');

    flipBtn.addEventListener('click', () => {
        inner.classList.add('flipped');

        // Reset tilt effect when flipping
        frontCard.style.transform = "none";

        updateHeights();
    });

    backBtn.addEventListener('click', () => {
        inner.classList.remove('flipped');
        updateHeights();
    });
});


/* ---------------------------------------------
   CAROUSEL SYSTEM (with fade transitions)
--------------------------------------------- */
const projectImages = {
    1: ["img/project1-1.png", "img/project1-2.png", "img/project1-3.png"],
    2: ["img/project2-1.png", "img/project2-2.png", "img/project2-3.png"],
    3: ["img/project3-1.png", "img/project3-2.png", "img/project3-3.png"]
};

document.querySelectorAll('.flip-container').forEach(container => {
    const projectId = container.getAttribute("data-project");
    const images = projectImages[projectId];

    let current = 0;

    const imgElement = container.querySelector('.carousel-img');
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    const carousel = container.querySelector('.fade-carousel');

    function fadeTo(newIndex) {
        carousel.classList.add("fade-out");

        setTimeout(() => {
            imgElement.src = images[newIndex];
            carousel.classList.remove("fade-out");
        }, 250);
    }

    prev.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        fadeTo(current);
    });

    next.addEventListener('click', () => {
        current = (current + 1) % images.length;
        fadeTo(current);
    });
});


/* ---------------------------------------------
   PARALLAX TILT (subtle, premium)
--------------------------------------------- */
document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (y / rect.height) * -6;
        const rotateY = (x / rect.width) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});
