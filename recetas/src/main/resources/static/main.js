document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ingredientes-form');
  const resultado = document.getElementById('resultado');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultado.textContent = 'Generando…';

    const ingredientes = document
      .getElementById('ingredientes')
      .value
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    try {
      const resp = await fetch('/api/recetas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredientes })
      });

      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      const text = await resp.text();
      resultado.textContent = text;
    } catch (err) {
      resultado.textContent = '¡Error al generar receta: ' + err.message;
    }
  });
});
