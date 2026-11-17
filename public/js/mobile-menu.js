const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('main-navigation');
const closeButton = menu?.querySelector('.menu-close');
const mobileViewport = window.matchMedia('(max-width: 768px)');

if (menuButton && menu && closeButton) {
  const menuLinks = menu.querySelectorAll('a');

  const closeMenu = () => {
    menu.removeAttribute('role');
    menu.removeAttribute('aria-modal');
    menu.removeAttribute('tabindex');
    menu.removeAttribute('data-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
    menuButton.focus();
  };

  const openMenu = () => {
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('tabindex', '-1');
    menu.setAttribute('data-open', 'true');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
    closeButton.focus();
  };

  menuButton.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);
  menu.addEventListener('click', (event) => {
    if (event.target === menu) {
      closeMenu();
    }
  });
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key === 'Tab') {
      const focusableElements = [closeButton, ...menuLinks];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  mobileViewport.addEventListener('change', (event) => {
    if (!event.matches && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}
