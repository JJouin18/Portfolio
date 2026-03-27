/* =========================
TEXTE QUI S'ECRIT
========================= */

const text = "DÉVELOPPEUR WEB"
const speed = 110

const typingElement = document.getElementById("typingText")
typingElement.textContent = ""  

const keys = document.querySelectorAll(".key")

let i = 0
let keyIndex = 0
let colorIndex = 0
const colors = ["blue","white","red"]


// Effet machine à écrire sur le titre principal (hero)
function type(){

if(i < text.length){

typingElement.textContent += text[i]

i++

setTimeout(type, speed)

}

}

if(typingElement){
type()
}



/* =========================
CLAVIER ANIMÉ
========================= */

function animateKeyboard(){

keys.forEach(k=>{
k.classList.remove("blue","white","red")
})

if(keys.length > 0){
keys[keyIndex].classList.add(colors[colorIndex])
}

keyIndex++
colorIndex++

if(keyIndex >= keys.length){
keyIndex = 0
}

if(colorIndex >= colors.length){
colorIndex = 0
}

}

setInterval(animateKeyboard,120)



/* =========================
PARALLAX HERO
========================= */

const hero = document.getElementById("hero")

window.addEventListener("scroll", () => {

if(hero){
let scrollPosition = window.scrollY
hero.style.backgroundPositionY = scrollPosition * 0.5 + "px"
}

})



/* =========================
TRAIL CURSEUR
========================= */

const canvas = document.getElementById("cursorTrail")

// Effet de traînée du curseur avec particules animées en canvas
if(canvas){

const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

const trailColors = [
"#2563eb",
"#ffffff",
"#dc2626"
]

document.addEventListener("mousemove", (e) => {

particles.push({
x: e.clientX,
y: e.clientY,
size: 6,
color: trailColors[Math.floor(Math.random() * trailColors.length)],
life: 40
})

if(particles.length > 120){
particles.shift()
}

})

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

// Dessine et fait disparaître progressivement chaque particule
for(let i = particles.length - 1; i >= 0; i--){

let p = particles[i]

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fillStyle = p.color
ctx.globalAlpha = p.life / 40

ctx.shadowBlur = 15
ctx.shadowColor = p.color

ctx.fill()

p.size *= 0.96
p.life--

if(p.life <= 0){
particles.splice(i,1)
}

}

ctx.globalAlpha = 1

requestAnimationFrame(animate)

}

animate()

window.addEventListener("resize",()=>{
canvas.width = window.innerWidth
canvas.height = window.innerHeight
})

}



/* =========================
NAVIGATION SECTIONS
========================= */

// Affiche la section sélectionnée et masque les autres
function showSection(sectionId) {

  const sections = document.querySelectorAll(".content-section");

  sections.forEach(section => {
    section.classList.add("hidden");
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
  }

  // RESET FILTRES PROJETS
  if (sectionId === "projects") {

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");

    // Retire l'état actif de tous les boutons
    filterBtns.forEach(btn => btn.classList.remove("active"));

    // Active "Toutes"
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add("active");

    // Affiche tous les projets
    projects.forEach(project => {
      project.style.display = "block";
    });
  }
}



/* =========================
FILTRE PROJETS
========================= */

const filterBtns = document.querySelectorAll(".filter-btn")
const projects = document.querySelectorAll(".project")

filterBtns.forEach(btn => {

btn.addEventListener("click", () => {

let filter = btn.dataset.filter

filterBtns.forEach(b => b.classList.remove("active"))
btn.classList.add("active")

projects.forEach(project => {

if(filter === "all" || project.classList.contains(filter)){
project.style.display = "block"
}
else{
project.style.display = "none"
}

})

})

})



/* =========================
BOUTON HERO → PROJETS
========================= */

// Scroll fluide vers la section projets depuis le hero
function goToProjects(){

showSection("projects")

const projectsSection = document.getElementById("projects")

if(projectsSection){
projectsSection.scrollIntoView({
behavior:"smooth"
})
}

}


let currentIndex = 0;
let currentImages = [];

// Ouvre la modale avec une galerie d'images dynamique
function openModal(images, title, showMask = true) {
    currentImages = images;
    currentIndex = 0;

    document.getElementById("modalImg").src = currentImages[currentIndex];
    document.getElementById("modalTitle").textContent = title;

    // masque logo
    const mask = document.getElementById("modalMask");
    if (showMask) {
        mask.style.display = "block";
    } else {
        mask.style.display = "none";
    }

    document.getElementById("modal").classList.remove("hidden");
}

// Ferme la modale
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Navigation entre les images (caroussel)
document.getElementById("prevBtn").onclick = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById("modalImg").src = currentImages[currentIndex];
};

document.getElementById("nextBtn").onclick = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    document.getElementById("modalImg").src = currentImages[currentIndex];
};
