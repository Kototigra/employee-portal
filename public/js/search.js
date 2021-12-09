const container = document.getElementById('container');
const select = document.getElementById('autoSizingSelect');
const searchtext = document.getElementById('autoSizingInput');
const tbody = document.getElementById('tbody');
const thead = document.getElementById('thead');

let choose = '';
select.addEventListener('change', (e) => {
  choose = e.target.value;
});
function block(info) {
  return `<tr id=${info.id}>
    <td>${info.first_name} ${info.last_name}</td>
  </tr>`;
}

function addTHead(name) {
  console.log(name);
  return `<tr>
    <th scope="col">${name}</th>
  </tr>`;
}

container.addEventListener('submit', async (e) => {
  e.preventDefault();
  const option = {
    method: 'POST',
    headers:
    { 'Content-type': 'application/json' },
    body: JSON.stringify({ text: searchtext.value, choose }),
  };
  const res = await fetch('/search', option);
  const { personsInfo } = await res.json();
  console.log(personsInfo);
  // console.log(personsInfo[0].firstName);
  tbody.innerHTML = '';
  personsInfo.forEach((element) => {
    tbody.insertAdjacentHTML('beforeend', block(element));
  });
  thead.innerHTML = '';
  thead.insertAdjacentHTML('afterbegin', addTHead(choose));
});

tbody.addEventListener('click', (e) => {
  const trId = e.target.closest('tr').id;
  window.location = `/users/${trId}`;
});
