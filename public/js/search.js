const container = document.getElementById('container');
const select = document.getElementById('autoSizingSelect');
const searchtext = document.getElementById('autoSizingInput');
const tbody = document.getElementById('tbody');
const thead = document.getElementById('thead');
const department = document.getElementById('dropdown-dep');
const team = document.getElementById('dropdown-team');
const profileLink = document.getElementById('profile_link');

let choose = '';
select.addEventListener('change', (e) => {
  choose = e.target.value;
});
function block(info) {
  console.log('choose', choose);
  if (choose === 'Teams') {
    return `<tr id=${info.id}>
    <td>${info.first_name} ${info.last_name}</td>
    <td> ${info.role_title} </td>
    </tr>`;
  }
  return `<tr id=${info.id}>
  <td>${info.first_name} ${info.last_name}</td>
</tr>`;
}

function addTHead(name) {
  console.log(name);
  if (choose === 'Teams') {
    return `<tr>
    <th scope="col">${name}</th>
    <th scope="col">Role in Team</th>
  </tr>`;
  }
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
  console.log('personsInfo');
  tbody.innerHTML = '';
  personsInfo.forEach((element) => {
    tbody.insertAdjacentHTML('beforeend', block(element));
  });
  thead.innerHTML = '';
  if (choose) {
    thead.insertAdjacentHTML('afterbegin', addTHead(searchtext.value));
  }
});

tbody.addEventListener('click', (e) => {
  const trId = e.target.closest('tr').id;
  window.location = `/users/${trId}`;
});

department.addEventListener('click', async (e) => {
  const depId = e.target.id;
  const resp = await fetch(`/dep/${depId}`, { method: 'POST' });
  const info = await resp.json();
  tbody.innerHTML = '';
  info.forEach((element) => {
    tbody.insertAdjacentHTML('beforeend', block(element));
  });
  thead.innerHTML = '';
  thead.insertAdjacentHTML('afterbegin', addTHead(e.target.innerText));
});

team.addEventListener('click', async (e) => {
  const teamId = e.target.id;
  const resp = await fetch(`/team/${teamId}`, { method: 'POST' });
  const info = await resp.json();
  tbody.innerHTML = '';
  info.forEach((element) => {
    tbody.insertAdjacentHTML('beforeend', block(element));
  });
  thead.innerHTML = '';
  thead.insertAdjacentHTML('afterbegin', addTHead(e.target.innerText));
});

profileLink.addEventListener('click', async (e) => {
  e.preventDefault();
  const result = await fetch('/users/ourProfile', {
    method: 'POST',
  });
  const { ourId } = await result.json();
  window.location.assign(`/users/${ourId}`);
});
