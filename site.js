(() => {
  'use strict';

  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    const desktop = window.matchMedia('(min-width: 901px)');

    const closeMenu = (restoreFocus = false) => {
      mobileNav.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) menuToggle.focus({ preventScroll: true });
    };

    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      mobileNav.hidden = !willOpen;
      menuToggle.setAttribute('aria-expanded', String(willOpen));
    });

    mobileNav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileNav.hidden) {
        closeMenu(true);
      }
    });

    const onViewportChange = (event) => {
      if (event.matches) closeMenu();
    };

    if (desktop.addEventListener) {
      desktop.addEventListener('change', onViewportChange);
    } else {
      desktop.addListener(onViewportChange);
    }

    closeMenu();
  }

  const form = document.getElementById('quote-form');
  const feedback = document.getElementById('form-feedback');
  const preview = document.getElementById('email-preview');
  const emailDraft = document.getElementById('email-draft');
  const emailLink = document.getElementById('email-link');
  const copyButton = document.getElementById('copy-request');
  const dateInput = document.getElementById('quote-date');

  if (dateInput) {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${today.getFullYear()}-${month}-${day}`;
  }

  if (!form || !feedback || !preview || !emailDraft || !emailLink || !copyButton) {
    return;
  }

  let currentRequest = '';
  let requestVersion = 0;
  const requiredTextFields = [
    { input: form.elements.namedItem('name'), message: 'Inserisci il tuo nome e cognome.' },
    { input: form.elements.namedItem('location'), message: 'Inserisci il luogo del tuo evento.' }
  ];

  requiredTextFields.forEach(({ input }) => {
    const clearCustomValidity = () => input.setCustomValidity('');
    input.addEventListener('input', clearCustomValidity);
    input.addEventListener('change', clearCustomValidity);
  });

  const showFeedback = (message) => {
    feedback.textContent = message;
    feedback.hidden = false;
  };

  const resetPreview = () => {
    requestVersion += 1;
    currentRequest = '';
    preview.hidden = true;
    feedback.hidden = true;
    feedback.textContent = '';
    emailDraft.value = '';
    emailLink.removeAttribute('href');
  };

  form.addEventListener('input', resetPreview);
  form.addEventListener('change', resetPreview);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    requiredTextFields.forEach(({ input, message }) => {
      input.setCustomValidity(input.value.trim() ? '' : message);
    });
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const readField = (name) => String(fields.get(name) || '').trim();
    const eventSelect = form.elements.namedItem('event');
    const eventType = eventSelect && eventSelect.selectedOptions
      ? eventSelect.selectedOptions[0].textContent.trim()
      : readField('event');
    const dateValue = readField('date');
    const readableDate = dateValue ? dateValue.split('-').reverse().join('/') : 'Da definire';
    const subject = `Richiesta di preventivo YRA’EAT — ${eventType}`;
    const lines = [
      'Ciao YRA’EAT,',
      '',
      'vorrei ricevere una proposta per il mio evento.',
      '',
      `Nome e cognome: ${readField('name')}`,
      `Email: ${readField('email')}`,
      `Telefono: ${readField('phone') || 'Non indicato'}`,
      `Tipo di evento: ${eventType}`,
      `Data: ${readableDate}`,
      `Numero di ospiti: ${readField('guests') || 'Da definire'}`,
      `Luogo: ${readField('location')}`,
      '',
      `Altri dettagli: ${readField('message') || 'Nessun dettaglio aggiuntivo.'}`,
      '',
      'Grazie!'
    ];

    requestVersion += 1;
    currentRequest = lines.join('\n');
    emailDraft.value = currentRequest;
    emailLink.href = `mailto:yraeat@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(currentRequest)}`;
    preview.hidden = false;
    showFeedback('La richiesta è pronta. Apri l’email per inviarla, oppure copia il messaggio.');
    emailLink.focus({ preventScroll: true });
  });

  copyButton.addEventListener('click', async () => {
    if (!currentRequest) return;

    const messageToCopy = currentRequest;
    const versionToCopy = requestVersion;

    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        throw new Error('Clipboard unavailable');
      }
      await navigator.clipboard.writeText(messageToCopy);
      if (versionToCopy !== requestVersion) return;
      showFeedback('Messaggio copiato. Incollalo nella tua email e invialo a yraeat@gmail.com.');
    } catch {
      if (versionToCopy !== requestVersion) return;
      emailDraft.focus({ preventScroll: true });
      emailDraft.select();
      showFeedback('La copia automatica non è disponibile. Il messaggio è selezionato: copialo manualmente e invialo a yraeat@gmail.com.');
    }
  });
})();
