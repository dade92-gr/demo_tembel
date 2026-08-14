// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Course Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .course-nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage.split('/').pop() || 
            currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Load JSON data for vocabulary if on vocabulary page
    if (currentPage.includes('data-kata')) {
        loadVocabularyData();
    }

    // Initialize tooltips
    initTooltips();
});

// Load Vocabulary Data
function loadVocabularyData() {
    fetch('data-kata.json')
        .then(response => response.json())
        .then(data => {
            console.log('Vocabulary data loaded:', data);
            // You can implement vocabulary display logic here
        })
        .catch(error => console.error('Error loading vocabulary data:', error));
}

// Initialize Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
            }
        });
    });
}

// Print PDF Functionality
function printPDF() {
    window.print();
}

// Navigation between pages
function navigateTo(page) {
    window.location.href = page;
}

// Search functionality
function searchContent() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
    if (!searchTerm) return;
    
    // Implement search logic based on your content structure
    alert(`Searching for: ${searchTerm}`);
    // You can expand this to actually search through your content
}

// Theme toggle (optional)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Add CSS for tooltips
const style = document.createElement('style');
style.textContent = `
    .tooltip {
        position: absolute;
        background: var(--primary-color);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    }
    
    .dark-theme {
        --primary-color: #1a252f;
        --secondary-color: #2980b9;
        --light-color: #2c3e50;
        --text-color: #ecf0f1;
        --text-light: #bdc3c7;
        background-color: #1a252f;
        color: #ecf0f1;
    }
    
    .dark-theme .subject-card,
    .dark-theme .feature-item,
    .dark-theme .content-card {
        background-color: #2c3e50;
    }
`;
document.head.appendChild(style);
// Debug untuk semua gambar
function debugImages() {
    console.group('=== IMAGE DEBUGGING ===');
    
    // Cek semua gambar di halaman
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        console.log(`[${index}] ${img.alt || 'no-alt'}:`);
        console.log(`  Source: ${img.src}`);
        console.log(`  Complete: ${img.complete}`);
        console.log(`  Natural size: ${img.naturalWidth}x${img.naturalHeight}`);
        console.log(`  Display size: ${img.width}x${img.height}`);
        
        if (img.naturalWidth === 0) {
            console.warn(`  ⚠️ Image may not be loaded or invalid!`);
        }
    });
    
    console.groupEnd();
    
    // Cek file di assets
    console.group('=== CHECKING ASSETS FILES ===');
    const assetFiles = [
        'assets/images/logo.png',
        'assets/images/ipas-thumbnail.jpg',
        'assets/images/informatika-thumbnail.jpg',
        'assets/images/kka-thumbnail.jpg'
    ];
    
    assetFiles.forEach(url => {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                console.log(`${response.ok ? '✅' : '❌'} ${url}: ${response.status} ${response.statusText}`);
            })
            .catch(error => {
                console.error(`❌ ${url}: ${error.message}`);
            });
    });
    console.groupEnd();
}

// Panggil saat halaman load
document.addEventListener('DOMContentLoaded', function() {
    debugImages();
    
    // Jalankan debug setelah 2 detik untuk pastikan semua gambar dicoba load
    setTimeout(debugImages, 2000);
});