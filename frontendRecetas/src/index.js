document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('recipe-form');
  const addBtn          = document.getElementById('add-group');
  const debugEl         = document.getElementById('debug');
  const recipeEl        = document.getElementById('recipe');
  const submitBtn       = document.getElementById('generate-btn');
  const groupsContainer = document.getElementById('ingredient-groups');
  const API_BASE        = window.API_BASE || '';

  // Crear nuevo grupo con botón de remover
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

  // Asignar remover al grupo inicial
  document.querySelectorAll('.group .remove-btn')
    .forEach(btn => btn.addEventListener('click', e => e.target.parentElement.remove()));

  // Añadir grupo al hacer clic
  addBtn.addEventListener('click', createGroup);

  // Manejar envío
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    recipeEl.textContent = '';
    debugEl.style.display = 'block';
    debugEl.textContent = 'Preparando petición...';

    // Recoger ingredientes
    const inputs = Array.from(document.querySelectorAll('.ingredients'));
    const ingredients = inputs
      .flatMap(i => i.value.split(',')
      .map(s => s.trim()).filter(Boolean));

    if (!ingredients.length) {
      debugEl.textContent = '❌ Por favor, introduce al menos un ingrediente.';
      submitBtn.disabled = false;
      return;
    }

    const payload = { ingredients };
    debugEl.textContent = `Payload:\n${JSON.stringify(payload, null, 2)}`;

    try {
      const res = await fetch(`${API_BASE}/api/recetas/generar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      debugEl.textContent += `\n\nHTTP ${res.status} ${res.statusText}`;
      const text = await res.text();
      recipeEl.textContent = text;
    } catch (err) {
      debugEl.textContent += `\n\n❌ Error: ${err.message}`;
      recipeEl.textContent = '❌ No se pudo generar la receta.';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
