  const input = document.querySelector("input")
  let offeredItems

  let elements = document.querySelector('.list__element').cloneNode(true)
  document.querySelector('.list__element').remove()

const debounce = (fn, debounceTime = 0) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
    fn(...args)
    }, debounceTime)
  }
 };
 
//получение списка репозиториев и выбор 5
async function logValues() {
  let search = document.querySelector('input').value
  let queryString = "https://api.github.com/search/repositories?" + 'q=' + search;
  const response = await fetch(queryString);
  const repos = await response.json();
  return repos.items.slice(0,5)
}

    //удалим элементы автозаполнения
    const remove = function() {
      elems = document.querySelectorAll('.offerList');
      for(i=0; i<elems.length; i++) {
      elems[i].parentNode.removeChild(elems[i]);
      } 
    }

    //триггер на ввод для автозаполнения
input.addEventListener('input', debounce(e => {
  logValues().then( el => {
  offeredItems = el
  const ul = document.querySelector("ul")
  remove()
  //добавим новые
    el.forEach(result => {
      let div = document.createElement('div');
      div.classList.add('offerList')
      ul.append(div)
      div.setAttribute('data-name', result.name)
      div.setAttribute('data-owner', result.owner.login)
      div.setAttribute('data-stars', result.watchers)
      div.innerHTML = result.name
    })
  })
}, 300))

//добавление в список репозиториев
document.body.onclick = function(event) {
  let target = event.target;
  if (!target.classList.contains('offerList')) return
  //Создание ячейки при клике
  const list = document.querySelector(".list")
  let clonedEl = elements.cloneNode(true)
  list.append(clonedEl)
  let name = document.querySelectorAll(".name")
  let owner = document.querySelectorAll(".owner")
  let stars = document.querySelectorAll(".stars")
  name[name.length -1].innerText = 'Name: ' + target.dataset.name
  owner[owner.length -1].innerText = 'Owner: ' + target.dataset.owner
  stars[stars.length -1].innerText = 'Stars: ' + target.dataset.stars

    //Очистка списка при клике
    remove()
    document.querySelector('input').value = ''
};


//удаление на крестик

document.body.addEventListener('click', function(event){
	if(event.target.classList.contains('close')) {
    event.target.parentNode.parentNode.remove()
    }	 
});