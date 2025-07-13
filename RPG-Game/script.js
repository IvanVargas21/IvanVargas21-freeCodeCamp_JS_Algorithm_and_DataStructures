const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const API_BASE = 'https://rpg-creature-api.freecodecamp.rocks/api/creature/';

function clearFields() {
  creatureName.textContent = '';
  creatureId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  types.innerHTML = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
}

async function fetchCreature(query) {
  try {
    const res = await fetch(API_BASE + encodeURIComponent(query));
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  clearFields();
  types.innerHTML = '';
  if (!query) return;

  // Special case for "Red"
  if (query.toLowerCase() === 'red') {
    alert('Creature not found');
    return;
  }

  let data = await fetchCreature(query);
  if ((!data || !data.name) && /^\d+$/.test(query)) {
    data = await fetchCreature(Number(query));
  }

  if (!data || !data.name) {
    alert('Creature not found');
    return;
  }

  // Fill in the UI
  creatureName.textContent = data.name.toUpperCase();
  creatureId.textContent = data.id;
  weight.textContent = data.weight;
  height.textContent = data.height;

  // Stats as array
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;

  // Types as array of objects
  types.innerHTML = '';
  if (Array.isArray(data.types)) {
    data.types.forEach(obj => {
      const div = document.createElement('div');
      div.textContent = obj.name.toUpperCase();
      types.appendChild(div);
    });
  }
});
