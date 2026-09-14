(() => {
  const initializePackSlotConsole = (consoleElement) => {
    if (consoleElement.dataset.packSlotInitialized === 'true') return;
    consoleElement.dataset.packSlotInitialized = 'true';

    const optionElements = Array.from(consoleElement.querySelectorAll('[data-pack-slot-option]'));
    const addButton = consoleElement.querySelector('[data-pack-slot-add]');
    const statusElement = consoleElement.querySelector('[data-pack-slot-status]');
    const errorElement = consoleElement.querySelector('[data-pack-slot-error]');
    const maxSlots = Number(consoleElement.dataset.maxSlots) || 5;
    const selectedVariantIds = new Set();

    if (!addButton || !statusElement || optionElements.length === 0) return;

    const setError = (message = '') => {
      errorElement.textContent = message;
      errorElement.hidden = !message;
    };

    const updateState = () => {
      const selectedCount = selectedVariantIds.size;
      statusElement.textContent = `${selectedCount} of ${maxSlots} positions selected`;
      addButton.disabled = selectedCount === 0 || selectedCount > maxSlots;
      addButton.setAttribute('aria-disabled', String(addButton.disabled));
      optionElements.forEach((optionElement) => {
        const isSelected = selectedVariantIds.has(optionElement.dataset.variantId);
        optionElement.setAttribute('aria-pressed', String(isSelected));
      });
    };

    optionElements.forEach((optionElement) => {
      optionElement.addEventListener('click', () => {
        if (optionElement.getAttribute('aria-disabled') === 'true') return;

        setError();
        const variantId = optionElement.dataset.variantId;
        if (!variantId) return;

        if (selectedVariantIds.has(variantId)) {
          selectedVariantIds.delete(variantId);
        } else if (selectedVariantIds.size < maxSlots) {
          selectedVariantIds.add(variantId);
        } else {
          statusElement.textContent = `Choose up to ${maxSlots} positions`;
        }
        updateState();
      });
    });

    addButton.addEventListener('click', async () => {
      if (selectedVariantIds.size === 0 || selectedVariantIds.size > maxSlots) return;

      addButton.disabled = true;
      addButton.setAttribute('aria-disabled', 'true');
      addButton.setAttribute('aria-busy', 'true');
      setError();
      statusElement.textContent = 'Adding selected positions…';

      try {
        const cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        const requestBody = {
          items: Array.from(selectedVariantIds).map((id) => ({ id, quantity: 1 })),
        };

        if (cart && typeof cart.getSectionsToRender === 'function') {
          requestBody.sections = cart.getSectionsToRender().map((section) => section.id);
          requestBody.sections_url = window.location.pathname;
          cart.setActiveElement?.(document.activeElement);
        }

        const response = await fetch(consoleElement.dataset.cartAddUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();

        if (!response.ok || responseData.status) {
          throw new Error(responseData.description || responseData.message || 'The selected positions could not be added.');
        }

        if (cart && responseData.sections && typeof cart.renderContents === 'function') {
          cart.renderContents(responseData);
        } else {
          window.location.href = consoleElement.dataset.cartUrl;
        }
      } catch (error) {
        addButton.disabled = false;
        addButton.setAttribute('aria-disabled', 'false');
        addButton.removeAttribute('aria-busy');
        statusElement.textContent = `${selectedVariantIds.size} of ${maxSlots} positions selected`;
        setError(error.message || 'The selected positions could not be added. Please try again.');
      }
    });

    updateState();
  };

  const initialize = () => {
    document.querySelectorAll('[data-pack-slot-console]').forEach(initializePackSlotConsole);
  };

  document.addEventListener('product-info:loaded', initialize);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
