document.addEventListener('DOMContentLoaded', () => {
    // === Utilitários Reutilizáveis ===
    // Função para gerenciar classes CSS de forma consistente
    const toggleClass = (element, className, force) => {
        if (element) {
            element.classList.toggle(className, force);
        }
    };

    // Função para gerenciar o overflow do body
    const setBodyOverflow = (isHidden) => {
        document.body.style.overflow = isHidden ? 'hidden' : '';
    };

    // Função para resetar o estado do menu (usado em múltiplos lugares)
    const resetMobileMenu = () => {
        const navMenu = document.getElementById('navMenu');
        const overlay = document.querySelector('.menu-overlay');

        if (navMenu && overlay) {
            toggleClass(navMenu, 'active', false);
            toggleClass(overlay, 'active', false);
            setBodyOverflow(false);
        }
    };

    // === 1. Header Fixo ao Rolar ===
    const setupStickyHeader = () => {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            toggleClass(header, 'scrolled', window.scrollY > 50);
        });
    };

    // === 2. Menu Mobile (Toggle e Overlay) ===
    const setupMobileMenu = () => {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const body = document.body;

        if (!navToggle || !navMenu) return;

        // Criar overlay para o menu mobile
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);

        // Lógica de toggle do menu e overlay
        const handleMenuToggle = () => {
            const isActive = navMenu.classList.contains('active');
            toggleClass(navMenu, 'active', !isActive);
            toggleClass(overlay, 'active', !isActive);
            setBodyOverflow(!isActive);
        };

        navToggle.addEventListener('click', handleMenuToggle);
        overlay.addEventListener('click', resetMobileMenu);

        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', resetMobileMenu);
        });

        // Fechar menu ao redimensionar a janela para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                resetMobileMenu();
            }
        });
    };

    // === 3. Animação Scroll Reveal ===
    const setupScrollReveal = () => {
        const elements = document.querySelectorAll('.reveal');
        const revealPoint = 150; // Offset para a animação

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - revealPoint) {
                    toggleClass(element, 'active', true);
                }
                // Opcional: Se quiser que o elemento 'desrevele' ao sair da tela
                // else {
                //     toggleClass(element, 'active', false);
                // }
            });
        };

        // Verificação inicial e ao rolar
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Chama na carga da página para elementos já visíveis
    };

    // === 4. Efeitos Hover para Cards (Portfólio e Cursos) ===
    const setupCardHoverEffects = () => {
        // Efeito para itens do Portfólio
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) { // Garante que o overlay existe
                item.addEventListener('mouseenter', () => toggleClass(overlay, 'active', true)); // Mudei para uma classe 'active' no CSS
                item.addEventListener('mouseleave', () => toggleClass(overlay, 'active', false));
            }
        });

        // Efeito para Cards de Curso
        document.querySelectorAll('.course-card').forEach(card => {
            const img = card.querySelector('.course-image img');
            if (img) { // Garante que a imagem existe
                card.addEventListener('mouseenter', () => img.style.transform = 'scale(1.1)');
                card.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
            }
        });
    };

    // === 5. Smooth Scroll para Âncoras ===
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 100; // Ajuste conforme a altura do seu header fixo
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // === Inicialização de Todas as Funcionalidades ===
    setupStickyHeader();
    setupMobileMenu();
    setupScrollReveal();
    setupCardHoverEffects();
    setupSmoothScroll();

    // === Service Worker Registration (PWA) ===
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});