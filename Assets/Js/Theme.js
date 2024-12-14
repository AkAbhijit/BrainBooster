function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        themeToggle.textContent = '🌙'; // Moon icon
    } else {
        themeToggle.textContent = '☀️'; // Sun icon
    }
}