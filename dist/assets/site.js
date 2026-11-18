const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navegacao');
menu.hidden = false;

function setMenuOpen(isOpen) {
  menu.setAttribute('aria-expanded', String(isOpen));
}

menu.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menu.focus();
  }
});

const search = document.querySelector('#busca');
const sector = document.querySelector('#setor');
const result = document.querySelector('#resultado');
const documents = [...document.querySelectorAll('#acervo li')];

function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

function filterDocuments() {
  const terms = normalize(search.value).trim().split(/\s+/);
  let count = 0;
  for (const item of documents) {
    const matchesSector = sector.value === 'todos' || item.dataset.setor === sector.value;
    const matchesSearch = terms.every((term) => normalize(item.textContent).includes(term));
    item.hidden = !(matchesSector && matchesSearch);
    if (!item.hidden) count++;
  }

  result.textContent = count === 0 ? 'Nenhum documento encontrado.' : `${count} ${count === 1 ? 'documento encontrado' : 'documentos encontrados'}.`;
}

document.querySelector('.filters').hidden = false;
result.hidden = false;
search.addEventListener('input', filterDocuments);
sector.addEventListener('change', filterDocuments);
document.querySelector('#limpar').addEventListener('click', () => {
  search.value = '';
  sector.value = 'todos';
  filterDocuments();
  search.focus();
});
filterDocuments();
