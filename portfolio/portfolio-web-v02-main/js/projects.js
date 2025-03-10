document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project-bubble');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const projectsPerPage = 3;
    let currentPage = 0;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    function showProjects(page) {
        const startIndex = page * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;

        projects.forEach((project, index) => {
            if (index >= startIndex && index < endIndex) {
                project.classList.remove('hidden');
                project.classList.add('active');
                // Add a small delay for each project to create a staggered animation
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, (index - startIndex) * 100);
            } else {
                project.classList.add('hidden');
                project.classList.remove('active');
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
            }
        });

        // Update button states
        prevBtn.disabled = page === 0;
        nextBtn.disabled = page >= totalPages - 1;

        // Add visual feedback for disabled state
        prevBtn.classList.toggle('disabled', page === 0);
        nextBtn.classList.toggle('disabled', page >= totalPages - 1);

        currentPage = page;
    }

    // Show first page on load
    showProjects(0);

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            showProjects(currentPage + 1);
        }
    });

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            showProjects(currentPage - 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
            showProjects(currentPage + 1);
        } else if (e.key === 'ArrowLeft' && currentPage > 0) {
            showProjects(currentPage - 1);
        }
    });
});
