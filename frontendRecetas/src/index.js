document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('recipe-form');
  const addBtn          = document.getElementById('add-group');
  const recipeEl        = document.getElementById('recipe');
  const submitBtn       = document.getElementById('generate-btn');
  const groupsContainer = document.getElementById('ingredient-groups');
  const API_BASE        = window.API_BASE || '';

  //función de notificación
  function showNotification(message, duration = 3000) {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    container.appendChild(notif);
    requestAnimationFrame(() => notif.classList.add('show'));
    setTimeout(() => {
      notif.classList.remove('show');
      notif.addEventListener('transitionend', () => notif.remove());
    }, duration);
  }

  //Crear nuevo grupo
  function createGroup() {
    const div = document.createElement('div');
    div.className = 'group';
    div.innerHTML = `
      <input type="text" class="ingredients" placeholder="Ej: queso, jamón">
      <button type="button" class="remove-btn" title="Quitar este grupo">×</button>
    `;
    div.querySelector('.remove-btn')
       .addEventListener('click', () => div.remove());
    groupsContainer.appendChild(div);
  }

  //Remover grupos
  document.querySelectorAll('.group .remove-btn')
    .forEach(btn => btn.addEventListener('click', e => e.target.parentElement.remove()));

  //boton Añadir un grupo --> busca la función de crear un grupo y la aplica
  addBtn.addEventListener('click', createGroup);

  //Envío de datos al backend
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    recipeEl.textContent = '';
    showNotification('Preparando petición...', 1000);

    //Captura los ingredientes
    const inputs = Array.from(document.querySelectorAll('.ingredients'));
    const ingredients = inputs
      .flatMap(i => i.value.split(',').map(s => s.trim()).filter(Boolean));

    if (!ingredients.length) {
      showNotification('❌ Introduce al menos un ingrediente.', 5000);
      submitBtn.disabled = false;
      return;
    }

    //carga los ingredientes
    const payload = { ingredients };

    try {
      const res = await fetch(`${API_BASE}/api/recetas/generar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const text = await res.text();
      recipeEl.textContent = text;
      showNotification('✅ Receta generada correctamente');
    } catch (err) {
      recipeEl.textContent = '❌ No se pudo generar la receta.';
      showNotification(`❌ Error: ${err.message}`, 5000);
    } finally {
      submitBtn.disabled = false;
    }
  });
});
