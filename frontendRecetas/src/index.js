document.addEventListener('DOMContentLoaded', () => {
  const debugEl  = document.getElementById('debug');
  const recipeEl = document.getElementById('recipe');
  const form     = document.getElementById('recipe-form');
  const addBtn   = document.getElementById('add-group');

  // Añadir nuevos grupos de ingredientes
  addBtn.addEventListener('click', () => {
    const container = document.getElementById('ingredient-groups');
    const div = document.createElement('div');
    div.className = 'group';
    div.innerHTML = `
      <label>Ingredientes (separados por comas):</label><br>
      <input type="text" class="ingredients" placeholder="Ej: queso, jamón"/><br>
    `;
    container.appendChild(div);
  });

  // Detecta host dinámicamente, pero fuerza el puerto 8080
  const backendBase = `${window.location.protocol}//${window.location.hostname}:8080`;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // 1) Lee todos los inputs .ingredients y genera un array plano
    const inputs = Array.from(document.querySelectorAll('.ingredients'));
    const ingredients = inputs.flatMap(i =>
      i.value
       .split(',')
       .map(s => s.trim())
       .filter(Boolean)
    );

    // 2) Prepara el payload
    const payload = { ingredients };

    // 3) Muestra en el panel debug lo que vas a enviar
    debugEl.textContent = `Payload:\n${JSON.stringify(payload, null, 2)}\n\nEnviando...`;

    try {
      // 4) Llama al backend
      const res = await fetch(`${backendBase}/api/recetas/generar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // 5) Lee la respuesta (texto plano)
      const text = await res.text();

      // 6) Actualiza el panel debug y el área de receta
      debugEl.textContent += `\n\nHTTP ${res.status} ${res.statusText}`;
      recipeEl.textContent = text;

    } catch (err) {
      console.error(err);
      debugEl.textContent += `\n\n❌ Error: ${err.message}`;
      recipeEl.textContent = '❌ No se pudo generar la receta.';
    }
  });
});
