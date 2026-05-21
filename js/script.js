/**
 * FACCIONE MODAS — Main script
 * Header scroll, contact modal, scroll reveal
 */

const App = {
    scrollThreshold: 100,
    revealOffset: 150,

    init() {
        this.cacheElements();
        this.bindHeaderScroll();
        this.bindModal();
        this.bindReveal();
        this.handleReveal();
    },

    cacheElements() {
        this.navbar = document.getElementById('navbar');
        this.modal = document.getElementById('contactModal');
        this.revealElements = document.querySelectorAll('.reveal');
        this.modalTriggers = document.querySelectorAll('[data-action="toggle-modal"]');
        this.modalClose = this.modal?.querySelector('[data-action="close-modal"]');
    },

    bindHeaderScroll() {
        if (!this.navbar) return;

        window.addEventListener(
            'scroll',
            () => {
                this.navbar.classList.toggle('active', window.scrollY > this.scrollThreshold);
            },
            { passive: true }
        );
    },

    bindModal() {
        if (!this.modal) return;

        this.modalTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleModal();
            });
        });

        this.modalClose?.addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },

    toggleModal() {
        const isActive = this.modal.classList.toggle('active');
        this.modal.setAttribute('aria-hidden', String(!isActive));
        document.body.style.overflow = isActive ? 'hidden' : '';
    },

    closeModal() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    },

    bindReveal() {
        window.addEventListener('scroll', () => this.handleReveal(), { passive: true });
    },

    handleReveal() {
        const windowHeight = window.innerHeight;

        this.revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - this.revealOffset) {
                element.classList.add('active');
            }
        });
    },
};

document.addEventListener('DOMContentLoaded', () => App.init());
