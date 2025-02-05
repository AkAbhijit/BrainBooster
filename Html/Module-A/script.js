// Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
})

//Smooth navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        })
    })
})
