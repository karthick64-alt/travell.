// Package Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const packageCards = document.querySelectorAll('.package-card');
    const packageCount = document.getElementById('package-count');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const packagesContainer = document.getElementById('packages-container');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter packages
            let visibleCount = 0;
            packageCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'all 0.3s ease';
                    }, 10);
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    card.style.transition = 'all 0.3s ease';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update count
            if (packageCount) {
                packageCount.textContent = visibleCount;
            }
        });
    });

    // Grid/List view toggle
    if (gridViewBtn && listViewBtn && packagesContainer) {
        gridViewBtn.addEventListener('click', function() {
            packagesContainer.classList.remove('grid-cols-1');
            packagesContainer.classList.add('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
            gridViewBtn.querySelector('i').classList.remove('text-gray-400');
            gridViewBtn.querySelector('i').classList.add('text-blue-600');
            listViewBtn.querySelector('i').classList.remove('text-blue-600');
            listViewBtn.querySelector('i').classList.add('text-gray-400');
        });

        listViewBtn.addEventListener('click', function() {
            packagesContainer.classList.remove('md:grid-cols-2', 'lg:grid-cols-3');
            packagesContainer.classList.add('grid-cols-1');
            listViewBtn.querySelector('i').classList.remove('text-gray-400');
            listViewBtn.querySelector('i').classList.add('text-blue-600');
            gridViewBtn.querySelector('i').classList.remove('text-blue-600');
            gridViewBtn.querySelector('i').classList.add('text-gray-400');
            
            // Update card layout for list view
            packageCards.forEach(card => {
                if (card.style.display !== 'none') {
                    card.classList.add('md:flex');
                    const img = card.querySelector('img');
                    const content = card.querySelector('.p-6');
                    if (img && content) {
                        img.parentElement.classList.add('md:w-1/3');
                        content.classList.add('md:w-2/3');
                    }
                }
            });
        });
    }
});

