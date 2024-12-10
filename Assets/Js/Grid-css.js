function loadPage(htmlFile, cssFile) {
    const existingLink = document.getElementById('dynamic-css');
    if (existingLink) {
        existingLink.href = cssFile;
    } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        link.id = 'dynamic-css';
        document.head.appendChild(link);
    }

    fetch(htmlFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content').innerHTML =
                '<p style="color: red; font-size: 1.2rem;">Error: Could not load the layout. Please try again.</p>';
        });
}