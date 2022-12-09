const items = [
  verdilhoGroup = [
    {
      name: 'Verdilho',
      img: '../../public/img/verdilho-01.png'
    },
    {
      name: 'Tubérculo de Verdilho',
      img: '../../public/img/verdilho-02.png'
    }
  ],

  magnesioGroup = [
    {
      name: 'Minério de Magnésio',
      img: '../../public/img/magnesio-01.png'
    },
    {
      name: 'Azulinho',
      img: '../../public/img/magnesio-02.png'
    }
  ],

  serpentinaGroup = [
    {
      name: 'Serpentina Gélida',
      img: '../../public/img/serpentina-01.png'
    },
    {
      name: 'Caules Estaladições',
      img: '../../public/img/serpentina-02.png'
    },
    {
      name: 'Besouro Gélido',
      img: '../../public/img/serpentina-03.png'
    }
  ],

  obykanGroup = [
    {
      name: 'Nuventilla de Obykan',
      img: '../../public/img/obykan-01.png'
    },
    {
      name: 'Sementes de Nuventilla',
      img: '../../public/img/obykan-02.png'
    },
    {
      name: 'Filamento Pegajoso',
      img: '../../public/img/obykan-03.png'
    }
  ],

  shardGroup = [
    {
      name: 'Minério Estelar',
      img: '../../public/img/shard-01.png'
    },
    {
      name: 'Estilha de Estrela',
      img: '../../public/img/shard-02.png'
    },
    {
      name: 'Corindo Khabul',
      img: '../../public/img/shard-03.png'
    },
    {
      name: 'Olho de Garguar',
      img: '../../public/img/shard-04.png'
    }
  ],

  prostradoGroup = [
    {
      name: 'Arbusto Prostrado',
      img: '../../public/img/prostrado-01.png'
    },
    {
      name: 'Cone do Arbusto Prostrado',
      img: '../../public/img/prostrado-02.png'
    },
    {
      name: 'Espihos do Arbusto Prostrado',
      img: '../../public/img/prostrado-03.png'
    },
    {
      name: 'Colofónia',
      img: '../../public/img/prostrado-04.png'
    }
  ],

  robustinhaGroup = [
    {
      name: 'Robustinha',
      img: '../../public/img/robustinha-01.png'
    },
    {
      name: 'Folha de Robustinha',
      img: '../../public/img/robustinha-02.png'
    },
    {
      name: 'Raiz de Robustinha',
      img: '../../public/img/robustinha-03.png'
    },
    {
      name: 'Seiva Espessa',
      img: '../../public/img/robustinha-04.png'
    }
  ],
];

const listaGroup = document.getElementById('list');
const resetButton = document.querySelector('.reset');
const calculateButton = document.querySelector('.calculate');
const table = document.querySelector('table');
const tableContainer = document.querySelector('.tableContainer');
const checkBoxPrice = document.querySelector('#defaultPrice');

let arrPrecoTotal = []

items.forEach(group => {
  const liGroupCreated = document.createElement('li');
  liGroupCreated.classList.add('li-group');
  listaGroup.appendChild(liGroupCreated)

  group.forEach(item => {
    liGroupCreated.innerHTML += `
    <li class="li-item">
      <img class="img-item" src="${item.img}"/>
      <div class="data-items">
        <span class="data-name">${item.name}</span>
        <input type="number" class="input quantity-item" placeholder="Quantidade"/>
        <input type="number" class="input price-item" placeholder="Preço individual"/>
      </div>
    </li>
    `
    })
  })

const allInputs = document.querySelectorAll('.input');
resetButton.addEventListener('click', () =>   {
  allInputs.forEach(input => {
    input.value = '';
  });
  clearTable()
  tableContainer.style.display = 'none'
});

let values = [];
let valorFinal = 0;
const allInputsPrice = document.querySelectorAll('.price-item');
const allInputsQuantity = document.querySelectorAll('.quantity-item');
const result = document.querySelector('.result');

calculateButton.addEventListener('click', () => {
  clearTable()
  let priceArr = []
  
  allInputsQuantity.forEach(inputQuantity => {
    let priceInputValue = inputQuantity.parentElement.querySelector('.price-item').value;
    let itemName = inputQuantity.parentElement.querySelector('.data-name').textContent
    let quantityInputValue = inputQuantity.value;
    let itemImg = (inputQuantity.parentElement).parentElement.querySelector('img').getAttribute('src');

    if(priceInputValue > 0) {
      priceArr.push({
        name: itemName,
        price: priceInputValue
      });
    }

    if(quantityInputValue * priceInputValue > 0) {
      trTable(itemName, quantityInputValue, priceInputValue, itemImg)
    }
  })
  
  if(table.querySelector('.data-tr')) {
    tableContainer.style.display = 'flex'
  } else {
    tableContainer.style.display = 'none'
  }

  calcPrecoTotal()
  localStorage.setItem('priceItens', JSON.stringify(priceArr))
});

function formatedValue(value, percentage = null) {
  let valuePercentageFormated = value - ((value * percentage)/100)
  return valuePercentageFormated.toLocaleString('pt-br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function formatedValueTeste(value, percentage = null) {
  let valuePercentageFormated = value - ((value * percentage)/100)
  return valuePercentageFormated.toLocaleString('pt-br');
}

function trTable(itemName, quantity, preco, img) {
  const value = quantity * preco
  arrPrecoTotal.push(value)
  var total = formatedValue(value)
  const lucro15 = formatedValue(value, 15);
  const lucro5 = formatedValue(value, 5);

  const tr = document.createElement('tr');
  tr.classList.add('data-tr');
  table.appendChild(tr);
  tr.innerHTML += `
  <td><img class="td-img" src="${img}"/></td>
  <td>${itemName}</td>
  <td>${formatedValueTeste(quantity)}</td>
  <td>${formatedValue(preco)}</td>
  <td>${total}</td>
  <td>${lucro15}</td>
  <td>${lucro5}</td>`
}

function clearTable() {
  table.querySelectorAll('.data-tr').forEach(e => {
    e.remove()
  })
}

checkBoxPrice.addEventListener('change', (e) => {
  let dataItens = JSON.parse(localStorage.getItem('priceItens'));
  if(e.target.checked) {
    allInputsPrice.forEach(input => {
      dataItens.forEach(data => {
        if(input.parentElement.querySelector('.data-name').textContent == data.name) {
          input.value = Number(data.price)
        }
      })
    })
  } else {
    resetPrices()
  }
})

function resetPrices() {
  allInputsPrice.forEach(input => {
    input.value = '';
  })
}

function calcPrecoTotal() {
  const tr = document.createElement('tr');
  const arrPrecoTotalSomado = arrPrecoTotal.reduce((acc, currentValue) => acc + currentValue, 0);

  table.appendChild(tr);
  tr.innerHTML = `
    <td class="td-ignore"></td>
    <td class="td-ignore"></td>
    <td class="td-ignore"></td>
    <td class="td-ignore"></td>
    <td class="total">${formatedValue(arrPrecoTotalSomado)}</td>
    <td class="totalLucro5">${formatedValue(arrPrecoTotalSomado, 15)}</td>
    <td class="totalLucro15">${formatedValue(arrPrecoTotalSomado, 5)}</td>
  `
}