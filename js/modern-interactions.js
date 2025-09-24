// Modern Interactions for Indus Electric

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic'
        });
    }
    
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
    
    // Tema Escuro/Claro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const body = document.body;
        const iconSun = themeToggle.querySelector('.fa-sun');
        const iconMoon = themeToggle.querySelector('.fa-moon');
        
        // Verificar preferência salva ou do sistema
        const savedTheme = localStorage.getItem('theme') || 'light';
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = savedTheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : savedTheme;
        
        // Aplicar tema
        function applyTheme(isDark) {
            if (isDark) {
                body.classList.add('dark-theme');
                if (iconSun) iconSun.style.display = 'block';
                if (iconMoon) iconMoon.style.display = 'none';
            } else {
                body.classList.remove('dark-theme');
                if (iconSun) iconSun.style.display = 'none';
                if (iconMoon) iconMoon.style.display = 'block';
            }
        }
        
        // Inicializar tema
        applyTheme(currentTheme === 'dark');
        
        // Alternar tema
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (iconSun && iconMoon) {
                if (isDark) {
                    iconSun.style.display = 'block';
                    iconMoon.style.display = 'none';
                } else {
                    iconSun.style.display = 'none';
                    iconMoon.style.display = 'block';
                }
            }
        });
        
        // Atualizar tema quando as preferências do sistema mudarem
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('theme') === 'system') {
                applyTheme(e.matches);
            }
        });
    }
    
    // Botão Voltar ao Topo - Melhorado
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        // Esconder o botão inicialmente
        backToTopButton.style.display = 'none';
        
        // Função para mostrar/esconder o botão
        const toggleBackToTop = () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
                setTimeout(() => backToTopButton.classList.add('visible'), 10);
            } else {
                backToTopButton.classList.remove('visible');
                // Espera a animação terminar antes de esconder o elemento
                setTimeout(() => {
                    if (!backToTopButton.classList.contains('visible')) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        };
        
        // Verificar na carga inicial
        toggleBackToTop();
        
        // Adicionar evento de scroll
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        
        // Comportamento do clique suave
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Suporte para toque em dispositivos móveis
        backToTopButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Menu Mobile - Aprimorado
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    let isMenuOpen = false;
    let resizeTimer;
    
    // Verificar se todos os elementos necessários existem
    if (navToggle && navMenu && menuOverlay) {
        // Adicionar classe inicial para evitar flash de conteúdo não estilizado
        document.documentElement.classList.add('js-nav-initialized');
        
        // Função para abrir o menu
        function openMenu() {
            if (isMenuOpen) return;
            
            // Desativar scroll da página
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            
            // Atualizar atributos de acessibilidade
            navToggle.setAttribute('aria-expanded', 'true');
            navMenu.setAttribute('aria-hidden', 'false');
            menuOverlay.setAttribute('aria-hidden', 'false');
            
            // Adicionar classes para animação
            menuOverlay.classList.add('active');
            navMenu.classList.add('active');
            
            // Atualizar estado
            isMenuOpen = true;
            
            // Focar no primeiro item do menu quando aberto
            requestAnimationFrame(() => {
                const firstLink = navMenu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            });
            
            // Adicionar evento de teclado para o documento
            document.addEventListener('keydown', handleDocumentKeyDown);
        }
        
        // Função para fechar o menu
        function closeMenu() {
            if (!isMenuOpen) return;
            
            // Atualizar atributos de acessibilidade
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            menuOverlay.setAttribute('aria-hidden', 'true');
            
            // Remover classes para animação
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            
            // Reativar scroll da página após a animação
            setTimeout(() => {
                if (!isMenuOpen) {
                    document.documentElement.style.overflow = '';
                    document.body.style.overflow = '';
                }
            }, 300); // Tempo da transição CSS
            
            // Atualizar estado
            isMenuOpen = false;
            
            // Devolver o foco para o botão do menu
            navToggle.focus();
            
            // Remover evento de teclado do documento
            document.removeEventListener('keydown', handleDocumentKeyDown);
        }
        
        // Alternar menu
        function toggleMenu() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // Manipulador de teclado para o documento
        function handleDocumentKeyDown(e) {
            // Fechar ao pressionar ESC
            if (e.key === 'Escape' || e.key === 'Esc') {
                e.preventDefault();
                closeMenu();
                return;
            }
            
            // Manter o foco dentro do menu quando aberto
            if (e.key === 'Tab' && isMenuOpen) {
                const focusableElements = Array.from(navMenu.querySelectorAll('a, button, [href], [tabindex]:not([tabindex="-1"])'));
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];n                
                // Se estiver no último elemento e pressionar Tab, voltar para o primeiro
                if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                } 
                // Se estiver no primeiro elemento e pressionar Shift+Tab, ir para o último
                else if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            }
        }
        
        // Evento de clique no botão do menu
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Fechar ao clicar no overlay
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });
        
        // Fechar ao pressionar Enter ou Espaço no botão do menu
        navToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Não fechar se for um link âncora na mesma página
                const href = link.getAttribute('href');
                
                if (href === '#' || (href && href.startsWith('#'))) {
                    e.preventDefault();
                    const targetId = href;
                    const targetElement = targetId === '#' ? document.body : document.querySelector(targetId);
                    
                    if (targetElement) {
                        closeMenu();
                        
                        // Rolar suavemente para a seção após o fechamento do menu
                        setTimeout(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Focar no elemento alvo para navegação por teclado
                            targetElement.setAttribute('tabindex', '-1');
                            targetElement.focus();
                            
                            // Remover o tabindex após o blur para evitar problemas de acessibilidade
                            const removeTabIndex = () => {
                                targetElement.removeAttribute('tabindex');
                                targetElement.removeEventListener('blur', removeTabIndex);
                            };
                            
                            targetElement.addEventListener('blur', removeTabIndex, { once: true });
                        }, 350); // Tempo para o menu fechar
                    }
                } else {
                    // Para links externos ou outras páginas, apenas feche o menu
                    closeMenu();
                }
            });
        });
        
        // Inicializar atributos ARIA
        navToggle.setAttribute('aria-haspopup', 'true');
        navToggle.setAttribute('aria-controls', 'navMenu');
        navMenu.setAttribute('role', 'menu');
        navMenu.setAttribute('aria-label', 'Menu principal');
        menuOverlay.setAttribute('aria-hidden', 'true');
        
        // Atualizar atributos ARIA dinamicamente
        const updateAriaAttributes = () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navMenu.setAttribute('aria-hidden', String(!isExpanded));
            menuOverlay.setAttribute('aria-hidden', String(!isExpanded));
            
            // Atualizar estado dos itens do menu
            document.querySelectorAll('.nav-menu [role="menuitem"]').forEach((item, index) => {
                item.setAttribute('tabindex', isExpanded ? '0' : '-1');
            });
        };
        
        // Observar mudanças nos atributos ARIA
        const observer = new MutationObserver(updateAriaAttributes);
        observer.observe(navToggle, { attributes: true, attributeFilter: ['aria-expanded'] });
        
        // Fechar menu ao redimensionar para desktop
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth >= 992 && isMenuOpen) {
                    closeMenu();
                }
            }, 250);
        };
        
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Fechar menu ao mudar de orientação do dispositivo
        window.addEventListener('orientationchange', () => {
            if (isMenuOpen) {
                closeMenu();
            }
        });
        
        // Inicializar atributos
        updateAriaAttributes();
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
                // Scroll para baixo
                header.classList.remove('scrolled-up');
                header.classList.add('scrolled-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
                // Scroll para cima
                header.classList.remove('scrolled-down');
                header.classList.add('scrolled-up');
            }
            
            header.classList.add('scrolled');
            lastScroll = currentScroll;
            
            // Adicionar sombra ao header quando rolar a página
            if (currentScroll > 50) {
                header.classList.add('shadow');
            } else {
                header.classList.remove('shadow');
            }
        });
    }
    
    // Animações suaves para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', () => {
            tooltip.classList.add('show');
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    });
    
    // Lazy loading para imagens
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam loading="lazy"
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// Função para verificar se um elemento está visível na viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adicionar classe quando o elemento estiver visível
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

// Verificar animações ao rolar a página
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
