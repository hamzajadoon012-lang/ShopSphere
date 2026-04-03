/**
 * Hamzify - Affiliate Marketing Website
 * JavaScript Functionality
 */

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const toast = document.getElementById('toast');
    const newsletterForm = document.getElementById('newsletterForm');
    const quickViewModal = document.getElementById('quickviewModal');

    // ========================================
    // MOBILE MENU
    // ========================================
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    function initCountdown() {
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!hoursEl || !minutesEl || !secondsEl) return;

        // Set countdown to 24 hours from now
        let totalSeconds = 24 * 60 * 60; // 24 hours in seconds

        function updateCountdown() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');

            if (totalSeconds > 0) {
                totalSeconds--;
            } else {
                // Reset countdown
                totalSeconds = 24 * 60 * 60;
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    initCountdown();

    // ========================================
    // TOAST NOTIFICATION
    // ========================================
    function showToast(message, type = 'success') {
        if (!toast) return;

        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('i');

        toastMessage.textContent = message;

        // Update icon based on type
        toastIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
        toast.style.background = type === 'success' ? 'var(--success-green)' : 'var(--primary-blue)';

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ========================================
    // FAVORITES (WISHLIST)
    // ========================================
    const FAVORITES_KEY = 'Hamzify:favorites';

    function getFavorites() {
        try {
            const raw = localStorage.getItem(FAVORITES_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            return [];
        }
    }

    function setFavorites(ids) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    }

    function setWishlistButtonState(button, isActive) {
        const icon = button.querySelector('i');
        if (!icon) return;

        if (isActive) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.background = '#cc0c39';
            button.style.color = 'var(--white)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.background = 'var(--white)';
            button.style.color = 'var(--text-dark)';
        }
    }

    function getProductData(card) {
        if (!card || !card.dataset) return null;
        return {
            id: card.dataset.productId || '',
            title: card.dataset.title || '',
            category: card.dataset.category || '',
            price: card.dataset.price || '',
            original: card.dataset.original || '',
            rating: card.dataset.rating || '',
            reviews: card.dataset.reviews || '',
            image: card.dataset.image || '',
            badge: card.dataset.badge || '',
            badgeClass: card.dataset.badgeClass || '',
            description: card.dataset.description || '',
            features: card.dataset.features ? card.dataset.features.split('|').map(s => s.trim()).filter(Boolean) : [],
            affiliate: card.dataset.affiliate || ''
        };
    }

    function updateFavoritesCount() {
        const favorites = getFavorites();
        document.querySelectorAll('[data-count="favorites"]').forEach(el => {
            el.textContent = favorites.length;
        });
    }

    function renderFavoritesGrid() {
        const favoritesGrid = document.getElementById('favoritesGrid');
        if (!favoritesGrid) return;

        const favorites = getFavorites();
        favoritesGrid.innerHTML = '';

        if (!favorites.length) {
            const empty = document.createElement('div');
            empty.className = 'favorites-empty';
            empty.textContent = 'No favorites yet. Tap the heart icon to save products.';
            favoritesGrid.appendChild(empty);
            return;
        }

        favorites.forEach((id) => {
            const sourceCard = document.querySelector(`.product-card[data-product-id="${id}"]`);
            const data = getProductData(sourceCard);
            if (!data) return;

            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.productId = data.id;
            card.dataset.title = data.title;
            card.dataset.category = data.category;
            card.dataset.price = data.price;
            card.dataset.original = data.original;
            card.dataset.rating = data.rating;
            card.dataset.reviews = data.reviews;
            card.dataset.image = data.image;
            card.dataset.badge = data.badge;
            card.dataset.description = data.description;
            card.dataset.features = data.features.join('|');
            card.dataset.affiliate = data.affiliate;

            card.innerHTML = `
                ${data.badge ? `<div class="product-badge ${data.badgeClass}">${data.badge}</div>` : ''}
                <div class="product-image">
                    <img src="${data.image}" alt="${data.title}" loading="lazy">
                    <div class="product-actions">
                        <button class="action-btn-wishlist" aria-label="Remove from favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn-quickview" aria-label="Quick view">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${data.category}</span>
                    <h3 class="product-title">${data.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${data.price}</span>
                        ${data.original ? `<span class="original-price">${data.original}</span>` : ''}
                    </div>
                    <a href="${data.affiliate || '#'}" class="btn btn-buy" data-affiliate="${data.affiliate || ''}" target="_blank" rel="noopener">
                        <i class="fas fa-shopping-cart"></i> Purchase
                    </a>
                </div>
            `;

            favoritesGrid.appendChild(card);
        });
    }

    function syncWishlistButtons() {
        const favorites = new Set(getFavorites());
        document.querySelectorAll('.action-btn-wishlist').forEach(btn => {
            const card = btn.closest('.product-card');
            const id = card && card.dataset ? card.dataset.productId : '';
            setWishlistButtonState(btn, favorites.has(id));
        });
    }

    function initWishlistButtons() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.action-btn-wishlist');
            if (!btn) return;

            e.preventDefault();
            e.stopPropagation();

            const card = btn.closest('.product-card');
            if (!card || !card.dataset.productId) return;

            const favorites = new Set(getFavorites());
            const id = card.dataset.productId;

            if (favorites.has(id)) {
                favorites.delete(id);
                showToast('Removed from favorites');
            } else {
                favorites.add(id);
                showToast('Added to favorites!');
            }

            setFavorites(Array.from(favorites));
            syncWishlistButtons();
            renderFavoritesGrid();
            updateFavoritesCount();
        });

        syncWishlistButtons();
        renderFavoritesGrid();
        updateFavoritesCount();
    }

    // ========================================
    // PURCHASE BUTTONS (AFFILIATE LINKS)
    // ========================================
    function initPurchaseButtons() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-buy, .btn-deal');
            if (!btn) return;

            const affiliate = btn.getAttribute('data-affiliate') || btn.getAttribute('href');
            if (!affiliate || affiliate === '#') {
                e.preventDefault();
                showToast('Affiliate link not set yet.', 'info');
                return;
            }

            // allow normal navigation for real links
        });
    }

    // ========================================
    // QUICK VIEW MODAL
    // ========================================
    function openQuickView(data) {
        if (!quickViewModal || !data) return;

        const modalTitle = quickViewModal.querySelector('.quickview-title');
        const modalImage = quickViewModal.querySelector('.quickview-image img');
        const modalCategory = quickViewModal.querySelector('.quickview-category');
        const modalPrice = quickViewModal.querySelector('.quickview-price .current-price');
        const modalOriginal = quickViewModal.querySelector('.quickview-price .original-price');
        const modalRating = quickViewModal.querySelector('.quickview-rating');
        const modalDescription = quickViewModal.querySelector('.quickview-description');
        const modalFeatures = quickViewModal.querySelector('.quickview-features');
        const modalBuy = quickViewModal.querySelector('.quickview-buy');

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalImage) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
        }
        if (modalPrice) modalPrice.textContent = data.price;
        if (modalOriginal) {
            if (data.original) {
                modalOriginal.textContent = data.original;
                modalOriginal.style.display = 'inline';
            } else {
                modalOriginal.style.display = 'none';
            }
        }
        if (modalRating) {
            modalRating.textContent = data.rating && data.reviews
                ? `${data.rating} / 5 (${data.reviews} reviews)`
                : '';
        }
        if (modalDescription) modalDescription.textContent = data.description || 'Full product details will be added soon.';
        if (modalFeatures) {
            modalFeatures.innerHTML = '';
            if (data.features.length) {
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
            }
        }
        if (modalBuy) {
            modalBuy.setAttribute('href', data.affiliate || '#');
            modalBuy.setAttribute('data-affiliate', data.affiliate || '');
        }

        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeQuickView() {
        if (!quickViewModal) return;
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function initQuickViewButtons() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.action-btn-quickview');
            if (!btn) return;

            e.preventDefault();
            e.stopPropagation();

            const card = btn.closest('.product-card');
            const data = getProductData(card);
            openQuickView(data);
        });

        if (!quickViewModal) return;

        const closeBtn = quickViewModal.querySelector('.quickview-close');
        const overlay = quickViewModal.querySelector('.quickview-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeQuickView);
        }
        if (overlay) {
            overlay.addEventListener('click', closeQuickView);
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quickViewModal.classList.contains('active')) {
                closeQuickView();
            }
        });
    }

    // ========================================
    // PRODUCT TABS
    // ========================================
    function initProductTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('[data-tab-panel]');

        if (!tabButtons.length || !tabPanels.length) return;

        function activateTab(target) {
            tabButtons.forEach(btn => {
                const isActive = btn.getAttribute('data-tab') === target;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            tabPanels.forEach(panel => {
                const isActive = panel.getAttribute('data-tab-panel') === target;
                panel.toggleAttribute('hidden', !isActive);
            });
        }

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');
                activateTab(target);
            });
        });

        if (window.location.hash === '#favorites') {
            activateTab('favorites');
        }

        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#favorites') {
                activateTab('favorites');
            }
        });
    }

    // ========================================
    // NEWSLETTER FORM
    // ========================================
    function initNewsletterForm() {
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            if (email) {
                showToast('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });

        // Sidebar newsletter forms
        const sidebarForms = document.querySelectorAll('.sidebar-newsletter-form');
        sidebarForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Thank you for subscribing!');
                form.reset();
            });
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.product-card, .category-card, .blog-card, .deal-card, .feature-card'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index % 4 * 100);

                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            revealObserver.observe(el);
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    }

    // ========================================
    // SEARCH FUNCTIONALITY
    // ========================================
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');

        if (searchInput && searchBtn) {
            function findProduct(query) {
                const cards = Array.from(document.querySelectorAll('.product-card'));
                const lower = query.toLowerCase();

                return cards.find(card => {
                    const title = (card.dataset.title || card.querySelector('.product-title')?.textContent || '').toLowerCase();
                    const category = (card.dataset.category || card.querySelector('.product-category')?.textContent || '').toLowerCase();
                    return title.includes(lower) || category.includes(lower);
                });
            }

            function goToProduct(card) {
                if (!card) return;
                const headerHeight = header ? header.offsetHeight : 0;
                const top = card.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
                card.classList.add('product-highlight');
                setTimeout(() => card.classList.remove('product-highlight'), 2000);
            }

            function handleSearch() {
                const query = searchInput.value.trim();
                if (!query) return;

                const match = findProduct(query);
                if (match) {
                    showToast(`Showing results for "${query}"`);
                    goToProduct(match);
                } else {
                    showToast(`No product found for "${query}"`, 'info');
                }
            }

            searchBtn.addEventListener('click', () => {
                handleSearch();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                }
            });

            // Expand search on focus (mobile)
            searchInput.addEventListener('focus', () => {
                if (window.innerWidth < 768) {
                    searchInput.parentElement.style.flex = '1';
                }
            });
        }
    }

    // ========================================
    // BLOG LISTING (Newest First)
    // ========================================
    const blogPosts = [
        {
            title: 'Best Products Under $50',
            category: 'Best Deals Online',
            date: '2026-04-03',
            readTime: '6 min read',
            excerpt: 'Buyer-intent picks under $50 with reviews and deals.',
            image: 'images/blog-2.jpg',
            url: 'blog-best-under-50.html'
        },
        {
            title: 'Top Rated Products 2026',
            category: 'Top Rated 2026',
            date: '2026-04-02',
            readTime: '7 min read',
            excerpt: 'Top rated products 2026 with buyer-intent picks and best deals online.',
            image: 'images/blog-3.jpg',
            url: 'blog-top-rated-2026.html'
        },
        {
            title: 'Best Fashion Picks Under $100',
            category: 'Fashion',
            date: '2026-04-01',
            readTime: '5 min read',
            excerpt: 'Top rated fashion 2026 picks under $100 with buyer-intent deals.',
            image: 'images/blog-1.jpg',
            url: 'blog-fashion-under-100.html'
        },
        {
            title: 'Top 10 Best Products to Buy Online',
            category: 'Digital Products',
            date: '2024-12-28',
            readTime: '12 min read',
            excerpt: 'Top 10 best products to buy online with reviews, deals, and budget-friendly picks.',
            image: 'images/blog-1.jpg',
            url: 'blog.html'
        }
    ];

    function initBlogList() {
        const list = document.getElementById('blogList');
        if (!list) return;

        const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
        list.innerHTML = '';

        sorted.forEach(post => {
            const card = document.createElement('article');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="${post.url}" class="blog-readmore">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            list.appendChild(card);
        });
    }

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            lazyImages.forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.style.opacity = '1';
            });
        }
    }

    // Add loaded class handler
    document.addEventListener('load', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.style.opacity = '1';
        }
    }, true);

    // ========================================
    // PRODUCT CARD HOVER EFFECTS
    // ========================================
    function initProductCardEffects() {
        document.addEventListener('mouseenter', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            card.style.zIndex = '10';
        }, true);

        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            card.style.zIndex = '1';
        }, true);
    }

    // ========================================
    // SHARE BUTTONS
    // ========================================
    function initShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');

        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = btn.classList[1];
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                let shareUrl = '';

                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                        break;
                    case 'pinterest':
                        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${title}&body=${url}`;
                        break;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    // ========================================
    // READING PROGRESS BAR (Blog Page)
    // ========================================
    function initReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent-orange);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // Only init on blog pages
    if (document.querySelector('.blog-article')) {
        initReadingProgress();
    }

    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for resize events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Handle resize
    const handleResize = throttle(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 992) {
            closeMobileMenu();
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // ========================================
    // INITIALIZE ALL FUNCTIONS
    // ========================================
    function init() {
        initWishlistButtons();
        initPurchaseButtons();
        initQuickViewButtons();
        initProductTabs();
        initNewsletterForm();
        initScrollReveal();
        initSmoothScroll();
        initSearch();
        initLazyLoading();
        initProductCardEffects();
        initShareButtons();
        initBlogList();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // EXPOSE GLOBAL FUNCTIONS
    // ========================================
    window.Hamzify = {
        showToast,
        openMobileMenu,
        closeMobileMenu
    };

})();

