const navbar=document.getElementById("navbar");
const flexcontainer=document.getElementById("flex-container");
const title=document.getElementById("title");
const item_modal=document.getElementById("item-modal");
const maincontainer=document.getElementById("main-container");
const noitem=document.getElementById("noitem");

let cardId=1;
let listItemId=1;
let cardLinkValue = 1;
function additem() {
    const addbtn = document.getElementById('addbtn');
    addbtn.addEventListener("click", function () {
        item_modal.style.display = "block";
        maincontainer.style.filter = "blur(7px)";
    })
}
additem();
function closeAdditem() {
    const itemclosebtn = document.getElementById('Item-closebtn');
    itemclosebtn.addEventListener("click", function () {
        item_modal.style.display = "none";
        maincontainer.style.filter = "none";
        
    })
}
closeAdditem();

function addToDOItem() {

    const itemaddbtn = document.getElementById('Item-addbtn');
    const flexcontainer = document.getElementById('flex-container');
    itemaddbtn.addEventListener("click", function () {
        item_modal.style.display = "none";
        maincontainer.style.filter = "none";
        noitem.innerText = " ";
        const cardtitle = document.getElementById('card-value').value;
        const element = document.createElement('div');
        element.classList.add('todo_card');
        element.setAttribute('id', `card${cardId}`);
        element.innerHTML = `
          <div class="todo_header">
          <button class="cardLink" value=${cardId}>${cardtitle}</button>
          </div>
          <hr>
          <div class="todo_body" id="cardBody${cardId}"></div>
            <div class="todo_btns">
              <button class="add_todo_list_btn" id="addItem-${cardId}" value=${cardId}>+</button>
              <button class="delete_todo_btn" id="deleteBtnContainer" value=${cardId} >
                <i class="fa-solid fa-trash-can" value=${cardId}></i>
              </button>
         </div>`;
        restoreHeader();
        restoreflexcontainer();
        flexcontainer.appendChild(element);
        cardId++;
    })

}
addToDOItem();

function addItemsList() {
    const listItems = document.getElementById('list-modal');
    let id = 0;
    flexcontainer.addEventListener("click", (event) => {
        if (event.target.classList.contains('add_todo_list_btn')) {
            maincontainer.style.filter = "blur(8px)";
            const listItemName = document.getElementById('listinput').value;
            listItems.style.display = "block";
            id = event.target.value;
        }
        else if (event.target.classList.contains('fa-trash-can')) {
            let valueOfDeleteBtn = event.target.parentElement.value;
            const card = document.getElementById('card' + valueOfDeleteBtn);
            card.remove();
            restoreHeader();
            restoreflexcontainer();
        }
        else if (event.target.classList.contains('markDonebtn')) {
            let markDoneValue = event.target.value;
            document.getElementById('markdoneBtn' + markDoneValue).style.display = 'none';
            document.getElementById('listText' + markDoneValue).style.textDecoration = "line-through";
            document.getElementById('listText' + markDoneValue).style.color="red";
        }
        else if (event.target.classList.contains('cardLink')) {
            cardLinkValue = event.target.getAttribute('value');
            changeHeader();
            showCard(event.target.innerText);
        }
    })

    const listaddbtn = document.getElementById('list-addbtn');
    listaddbtn.addEventListener("click", function () {
        document.getElementById('list-modal').style.display = "none";
        maincontainer.style.filter = "none";

        const listItemName = document.getElementById('listinput').value;
        const listItem = document.createElement('div');
        listItem.classList.add('listItem');
        let listItemContent = `
            <span id=listText${listItemId} class='listText'>${listItemName}</span>
            <button id=markdoneBtn${listItemId} class='markDonebtn' value=${listItemId}>Mark Done</button>`;
        listItem.innerHTML = listItemContent;
        listItems.style.display = "none";
        document.getElementById('cardBody' + id).append(listItem);
        listItemId++;
    })
}
addItemsList();

function closeListForm() {
    const listclosebtn = document.getElementById('list-closebtn');
    listclosebtn.addEventListener("click", function () {
        document.getElementById('list-modal').style.display = "none";
        maincontainer.style.filter = "none";
    })
}
closeListForm();
function flexcontainerClick() {
    const flexcontainer = document.getElementById('flex-container');
    flexcontainer.addEventListener("click", function () {

    })

}
function showCard(cardName) {
    let cards = document.getElementsByClassName('todo_card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('id') != 'card' + cardLinkValue) {
            cards[i].style.display = "none";
        }
    }
    flexcontainer.style.justifyContent = "center";
    flexcontainer.style.alignItems = "flex-start";
    document.getElementById('card' + cardLinkValue).classList.add('bigTodoCard');
    title.style.display = "inline";
    title.innerText = cardName;
}

function changeHeader() {
    document.getElementById('task').style.display = "none";
    document.getElementById('list').style.display = "none";
    document.getElementById('backbtn').style.display = "block";
}
function restoreHeader() {
    document.getElementById('task').style.display = "inline";
    document.getElementById('list').style.display = "inline";
    document.getElementById('backbtn').style.display = "none";
    title.style.display = "none";
}

const backbtn = document.getElementById('backbtn');
backbtn.addEventListener("click", restoreflexcontainer);

function restoreflexcontainer() {
    let cards = document.getElementsByClassName('todo_card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
    }
    flexcontainer.style.justifyContent = "space-between";
    restoreHeader();
    try {
        document.getElementById('card' + cardLinkValue).classList.remove('bigTodoCard');
    }
    catch (error) {
        console.log("");
    }
}