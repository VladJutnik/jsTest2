const addLine = document.getElementById('addLine'),
    addColumns = document.getElementById('addColumns')
const buttonFinish = document.getElementById('ready_obj'),
    buttonPreview = document.getElementById('preview')
let fff = [
    {
        idRow: "1",
        nameRow: "Название области",
        col: [
            {
                idCol: "row1/col1",
                element: [
                    {id: 1, textInput: "wdwdwd", type: "input"}
                ]
            }
        ]
    },
    {
        idRow: "2",
        nameRow: "Название области",
        col: [
            {
                idCol: "row2/col1",
                element: [
                    {id: 4, type: 'date', textInput: 'efefefefef'},
                    {id: 6, type: 'input', textInput: 'gggggggggg'},
                    {id: 7, type: 'input', textInput: 'ffff'},
                ]
            },
            {
                idCol: "row2/col2",
                element: [
                    {id: 2, type: 'date', textInput: 'wdwdwd'}
                ]
            },
            {
                idCol: "row2/col3",
                element: [
                    {id: 8, type: 'input', textInput: 'ffff'},
                    {id: 3, type: 'input', textInput: 'efefefef'}
                ]
            }
        ]
    }
]
let arr = {} // временный от туда можно будет удалять данные или положить данные хз пока
let data = [] //финальный объект со всеми данными
let dragItem = '' //сюда делаем копию элемента которую будем перемещать
let itemId = '' //сюда определяем какой элемент мы перетащили дата и время или просто инпут или текс арея
let idItemsEl = 1 //id элементов куда тащим элементы
let idBoardEl = 2 // id доски куда тащим элементы

//ф-ции для добавления колонок
function addBoard() {
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.innerHTML = `
        <div class="fon border-2 rounded mb-3 zone ">
            <div id="${idBoardEl}" class="super_row">
                <div id="row${idBoardEl++}" class="col-flex-element colZone"></div>
            </div>
        </div>
    `
    boards.append(board)
    dragAndDropZones()
}
addLine.addEventListener('click', addBoard)

function dragAndDropZones() {
    //находим все зоны в которые можно скидывать элементы
    const listsZones = document.querySelectorAll('.col-flex-element:not(.DragZoneProcessed)')
    for (let j = 0; j < listsZones.length; j++) {
        listsZones[j].classList.add("DragZoneProcessed")
        listsZones[j].addEventListener(`dragstart`, (evt) => {
            evt.target.classList.add(`selected`);
        });
        listsZones[j].addEventListener('dragover', e => {
            e.preventDefault()
            const currentElement = e.target;
            if(currentElement.classList.contains(`listItemReady`)) {
                const activeElement = listsZones[j].querySelector(`.selected`);
                const currentElement = e.target;
                const nextElement = (currentElement === activeElement.nextElementSibling) ?
                    currentElement.nextElementSibling :
                    currentElement;
                listsZones[j].insertBefore(activeElement, nextElement);
            }
        })
        listsZones[j].addEventListener('dragover', e => {
            e.preventDefault()
        })
        listsZones[j].addEventListener('dragenter', function (e) {
            e.preventDefault() //убираем стандартные работы браузера
        })
        listsZones[j].addEventListener('dragleave', function (e) {
            e.preventDefault()
        })
        //определили в какую зону скинули элемент
        listsZones[j].addEventListener('drop', function (e) {
            /*
            * ИЗБАВИТСЯ ОТ itemId с помошью e.target.id
            * потом избавиться от dragItem определить какой элемент был передвинут из правого сектора или левого
            * Для того чтобы можно было перетаскивать элементы между секций
            * НЕ ИЗМЕНЯЕТСЯ У ЭЛЕМЕНТОВ id !!
            * */
            //element.classList.contains('addColumns');
            //console.log(e.target)
            //ТУТ ТЕПЕРЬ ЕЩ ПРОВЕРЯТЬ ПРОСТО ПЕРЕТАСКИВАЕМ ЭЛЕМЕНТ ИЛИ ЧТО ПЫТАЕМСЯ СДЕЛАТЬ
            if (itemId !== 'addColumns') {
                this.append(dragItem)
                dragItem = ''
                //showModal()
                //dragAndDropSorting()
            } else if(itemId === 'addColumns') {
                //console.log(e.target.parentElement)
                //console.log(e.target.classList.contains('DragZoneProcessed'))
                if (e.target.parentElement.querySelectorAll('.colZone').length === 3) {
                    alert('Вы больше не можете добавить сюда колонки! Добавьте новую строку')
                } else {
                    dragItem.id = `row${idBoardEl++}`
                    listsZones[j].parentElement.append(dragItem)
                    dragItem = ''
                    dragAndDropZones()
                }
            }

        })
        listsZones[j].addEventListener(`dragend`, (e) => {
            e.target.classList.remove(`selected`);
        });
    }

}
dragAndDropZones()

function dragAndDropRightColumn() {
    //перечисляем все элементы в правой колонке
    const listItems = document.querySelectorAll('.list_item')
    //перебераем массивы
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i]
        //начали перемещать элемент
        item.addEventListener('dragstart', (e) => {
            //console.log(e.target.id)
            if (e.target.id === 'addColumns') {
                itemId = item.id
                dragItem = document.createElement('div')
                dragItem.classList.add("col-flex-element");
                dragItem.classList.add("colZone");
            } else {
                dragItem = item.cloneNode();
                itemId = item.id
                dragItem.id = idItemsEl++;
                dragItem.classList.remove('list_item');
                dragItem.classList.add("listItemReady");
                dragItem.innerText = item.innerText;
                console.log(dragItem)
            }
            //удаление элемента
            //dragItem.addEventListener('dblclick', (e)=>{
            //    //console.log(e.path[0].id)
            //    document.getElementById(e.path[0].id).remove()
            //})
        })
        item.addEventListener('dragend', () => {})
    }
}
dragAndDropRightColumn()






//тут проверять что в какой зоне находиться элемент и и тд
/*function dragAndDropSorting()
{
    //перечисляем все элементы в правой колонке
    /!*!/!*
    * ДОБАВИТЬ СЮДА ('.col-flex-element:not(.wdwdwdw)') что бы каждый раз не навешивать события сюда !!!
    * *!/!*!/
    const listItems = document.querySelectorAll('.listItemReady:not(.DragZoneSorting)')

    //перебераем массивы
    for (let i = 0; i < listItems.length; i++)
    {
        const item = listItems[i]
        listItems[i].classList.add("DragZoneSorting")
        //начали перемещать элемент
        item.addEventListener('dragstart', (e) => {
            dragItem = item.cloneNode();
        })
    }
}*/







/*
function dragAndDropRightColumn()
{
    //перечисляем все элементы в правой колонке
    const listItems = document.querySelectorAll('.list_item')
    //перебераем массивы
    for (let i = 0; i < listItems.length; i++)
    {
        const item = listItems[i]
        //начали перемещать элемент
        item.addEventListener('dragstart', () => {
            console.log(item.id)
            if (item.id === 'addColumns')
            {
                itemId = item.id
                dragItem = document.createElement('div')
                dragItem.classList.add("col-flex-element");
                dragItem.classList.add("colZone");
            }
            else
            {
                dragItem = item.cloneNode();
                itemId = item.id
                dragItem.id = idItemsEl;
                //dragItem.setAttribute("draggable", "false");
                dragItem.classList.remove('list_item');
                dragItem.classList.add("listItemReady");
                dragItem.innerText = item.innerText;
            }
            //удаление элемента
             //dragItem.addEventListener('dblclick', (e)=>{
             //    //console.log(e.path[0].id)
             //    document.getElementById(e.path[0].id).remove()
             //})
        })
        //Надо сделать так при перетаскивании не удалять элемент сразу а только после того как он dragend совершил
        //возращаем элемент
        item.addEventListener('dragend', () => {
        })
    }
}

dragAndDropRightColumn()



//фнкции работы с модальными окнами
function showModal()
{
    console.log(itemId)
    //ТАК НЕ ПРАВИЛЬНО НУЖНО СДЕЛАТЬ ЧТо бы было карсиво без id
    let ddd = ''
    switch (itemId)
    {
        case 'textField':
            $('#modalefefef').modal('show')
            ddd = '<label for="textInput">Наименование элемента</label>' +
                '<input type="text" class="form-control textInput" id="textInput">'

            break;
        case 'dateField':
            $('#modalefefef2').modal('show')
            document.getElementById('yes2').addEventListener('click', yesBtnModalInput)
            document.getElementById('no2').addEventListener('click', noBtnModal)
            break;
    }
    ddd += '<button id="yes" class="yes">Сохранить</button>' +
        '<button id="no" class="no">Отменить</button>'
    document.getElementById('resultModalS').innerHTML += ddd
    document.querySelector('.modal-title').innerHTML = 'Работа с тектовым полем'
    document.getElementById('yes').addEventListener('click', yesBtnModalInput)
    document.getElementById('no').addEventListener('click', noBtnModal)
}

function yesBtnModalInput()
{
    //https://itchief.ru/javascript/associative-arrays
    switch (itemId)
    {
        case 'textField':
            arr[idItemsEl] = {
                id: idItemsEl,
                type: 'input',
                textInput: document.querySelector(".textInput").value,
            }
            $('#modalefefef').modal('hide')
            document.querySelector(".textInput").value = ''
            document.getElementById('resultModalS').innerHTML = ''
            break;
        case 'cart2':
            arr[idItemsEl] = {
                id: idItemsEl,
                type: 'date',
                textInput: document.querySelector(".textInput2").value,
            }
            $('#modalefefef2').modal('hide')
            document.querySelector(".textInput2").value = ''
            break;
    }
    idItemsEl++ //для новых id
    //console.log(arr)
    //document.getElementById('result').append(arr)
}

function noBtnModal()
{
    dragItem.remove()
    switch (itemId)
    {
        case 'cart1':
            $('#modalefefef').modal('hide')
            break;
        case 'cart2':
            $('#modalefefef2').modal('hide')
            break;
    }
    dragItem = ''
}

//собираем все карточки в объект
function finish()
{
    data = []
    //тут хочу получить список всех лини у линии есть колонки в которых есть элементы которые мы перенесли
    const boards = document.querySelector('.boards'),
        rowItems = boards.querySelectorAll('.zone')
    //перебераем массивы
    for (let i = 0; i < rowItems.length; i++)
    {
        //теперь ищим колонки в зоне!
        const colItems = rowItems[i].querySelectorAll('.colZone')
        col = []
        for (let j = 0; j < colItems.length; j++)
        {
            //перебераю списики внутри колонки
            const listItemReady = colItems[j].querySelectorAll('.listItemReady')
            //console.log(listItemReady.length)
            //проверяем колонки они могут быть пустые но они должны отображены быть все равно в финальном объекте
            let arr2 = []
            if (listItemReady.length !== 0)
            {
                //теперь ищим карточки с элементами и собираем объект data
                for (let k = 0; k < listItemReady.length; k++)
                {
                    //console.log(rowItems[i].id)
                    //console.log(colItems[j].id)
                    //console.log(listItemReady[k].id)
                    //тут нужно собирать по очереди ключи объекта
                    // после этого постепенно добавлять просто если даже пустые колонки что бы были с пусты значением
                    //console.log(colItems[j].id)
                    //console.log(listItemReady[k].id)
                    //console.log(11111)
                    arr2.push(arr[listItemReady[k].id])
                    //Object.assign(col, arr[listItemReady[k].id])
                }
            }
            col.push({
                idCol: colItems[j].id,
                element: arr2
            })
        }
        data.push({
            idRow: rowItems[i].id,
            nameRow: rowItems[i].parentNode.querySelector('span').textContent,
            col: col
        })
        col = {}
    }
    console.log(data)
}

//это по старому
function finish2()
{
    //тут хочу получить список всех лини у линии есть колонки в которых есть элементы которые мы перенесли
    const boards = document.querySelector('.boards'),
        rowItems = boards.querySelectorAll('.zone')
    //перебераем массивы
    for (let i = 0; i < rowItems.length; i++)
    {
        //теперь ищим колонки в зоне!
        const colItems = rowItems[i].querySelectorAll('.colZone')

        for (let j = 0; j < colItems.length; j++)
        {
            //перебераю списики внутри колонки
            const listItemReady = colItems[j].querySelectorAll('.listItemReady')
            //console.log(listItemReady.length)
            //проверяем колонки они могут быть пустые но они должны отображены быть все равно в финальном объекте
            col = {}
            if (listItemReady.length !== 0)
            {
                //теперь ищим карточки с элементами и собираем объект data
                for (let k = 0; k < listItemReady.length; k++)
                {
                    //console.log(rowItems[i].id)
                    //console.log(colItems[j].id)
                    //console.log(listItemReady[k].id)
                    //тут нужно собирать по очереди ключи объекта
                    // после этого постепенно добавлять просто если даже пустые колонки что бы были с пусты значением
                    console.log(colItems[j].id)
                    console.log(listItemReady[k].id)
                    console.log(11111)
                    Object.assign(col, arr[listItemReady[k].id])
                }
            }
            console.log(col)
            col = {}
            //data[rowItems[i].id] = {
            //    'nameRow': rowItems[i].parentNode.querySelector('span').textContent,
            //    [colItems[j].id]: col
            //}
        }
    }
    console.log(data)
}

buttonFinish.addEventListener('click', finish)
//Для отрисовки страницы

//<label htmlFor="textInput">Наименование элемента</label>
//<input type="text" className="form-control textInput" id="textInput">

function preview()
{
    let content = '';
    if (data !== [])
    {
        //console.log(data)
        content += '<div class="container-fluid rounded border border-primary">'
        data.forEach(function (item, i, arr) {
            //console.log(item.col)
            content += '<div class="row">'
            content += `<h5 class="text-center mb-2">${item.nameRow}</h5>`
            if (item.col.length === 1)
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-12">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            else if (item.col.length === 2)
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-6">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            else
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-4">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            content += '</div><br>'
        })
        content += '</div>'
    }
    else
    {
        content += `
                    <div class="alert alert-danger text-center font-weight-bold" role="alert">
                        Данных на странице не найдено! Добавьте колонки и элементы на страницу!
                    </div>`
    }
    $('#result').html(content);
}

function preview2()
{
    let content = '';
    if (fff !== [])
    {
        console.log(fff)
        content += '<div class="container-fluid rounded border border-primary">'
        fff.forEach(function (item, i, arr) {
            console.log(item.col)
            content += '<div class="row">'
            content += `<h5 class="text-center mb-2">${item.nameRow}</h5>`
            if (item.col.length === 1)
            {
                item.col.forEach(function (item, i, arr) {
                    console.log(item)
                    content += '<div class="col-12">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            else if (item.col.length === 2)
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-6">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            else
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-4">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            content += '</div><br>'
        })
        content += '</div>'
    }
    else
    {
        content += `
                    <div class="alert alert-danger text-center font-weight-bold" role="alert">
                        Данных на странице не найдено! Добавьте колонки и элементы на страницу!
                    </div>`
    }
    $('#result').html(content);
}

buttonPreview.addEventListener('click', preview2)
//Это были первые наброски
//function changeTitle(){
//    const titles = document.querySelectorAll('.title')
//    titles.forEach(title =>{
//        title.addEventListener('click', e => {
//            console.log(title)
//            old = e.target.textContent
//            e.target.textContent = ''
//        })
//    })
//}
//changeTitle()
//var sortable = document.querySelector('.sortable');
//console.log(sortable)
//
//function dragulaF(sortable){
//    dragula([sortable]);
//}
/*function dragAndDrop(){
    const listItems = document.querySelectorAll('.list_item'),
        lists2 = document.querySelectorAll('.boards_items')
    //перебераем массивы
    for(let i = 0; i < listItems.length; i++){
        const item = listItems[i]
        //начали перемещать элемент
        item.addEventListener('dragstart', ()=>{
            //item.parentElement.append(item)
            dragItem = item.cloneNode();

            //$('#modalefefef').modal('show');
            console.log(item)
            //console.log(item.parentElement)
            //удаление элемента
            dragItem.addEventListener('dblclick', (e)=>{
                //console.log(e.path[0].id)
                document.getElementById(e.path[0].id).remove()
            })
            dragItem.id = idItemsEl;
            dragItem.setAttribute("draggable", "false");
            dragItem.classList.remove('list_item');
            dragItem.classList.add("ok", "understand");
            dragItem.innerText = item.innerText;
            //добавляю в массив значения
            arr.push(idItemsEl);
            //ОН ДВАЖДЫ назначает id
            console.log(arr)
            idItemsEl++
        })
        //Надо сделать так при перетаскивании не удалять элемент сразу а только после того как он dragend совершил
        //возращаем элемент
        item.addEventListener('dragend', ()=>{

        })
        //навешиваем для наших областей
        for(let j = 0; j < lists2.length; j++){
            const list555 = lists2[j]
            //перетакивание на новую доску
            list555.addEventListener('dragover', e =>{
                e.preventDefault()
            })
            list555.addEventListener('dragenter', function (e){
                e.preventDefault() //убираем стандартные работы браузера
                //this.style.backgroundColor = 'rgba(0,0,0,.3)'
            })
            list555.addEventListener('dragleave', function (e){
                //this.style.backgroundColor = 'rgba(0,0,0,0)'
            })
            list555.addEventListener('drop', function (e){


                this.append(dragItem)

                //тут вызывать функциию для перетаскивания элементов внутри области или подумать
                // мб для перетаскивания в разные областя
            })
        }
    }
}
dragAndDrop()*/


const buttonPreview2 = document.getElementById('preview'),
    resultPreview2 = document.querySelector('#result')

let fff2 = [
    {
        idRow: "1",
        nameRow: "Название области",
        col: [
            {
                idCol: "row1/col1",
                element: [
                    {id: 1, textInput: "wdwdwd", type: "input"}
                ]
            }
        ]
    },
    {
        idRow: "2",
        nameRow: "Название области",
        col: [
            {
                idCol: "row2/col1",
                element: [
                    {id: 4, type: 'date', textInput: 'efefefefef'},
                    {id: 6, type: 'input', textInput: 'gggggggggg'},
                    {id: 7, type: 'input', textInput: 'ffff'},
                ]
            },
            {
                idCol: "row2/col2",
                element: [
                    {id: 2, type: 'date', textInput: 'wdwdwd'}
                ]
            },
            {
                idCol: "row2/col3",
                element: [
                    {id: 8, type: 'input', textInput: 'ffff'},
                    {id: 3, type: 'input', textInput: 'efefefef'}
                ]
            }
        ]
    }
]

//ОТРИСОВКА ОБЪЕКТА
function preview()
{
    let content = '';
    if (fff !== [])
    {
        //console.log(fff)
        content += '<div class="container-fluid rounded border border-primary">'
        fff.forEach(function (item, i, arr) {
            //console.log(item.col)
            content += '<div class="row">'
            content += `<h5 class="text-center mb-2">${item.nameRow}</h5>`
            if (item.col.length === 1)
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-12">'
                    /*
                    МБ СОЗДАТЬ МАССИВ С ЭЛЕМЕНТАМИ УЖЕ ГОТОВЫМИ КОТОРЫЕ ДОЛЖНЫ БЫТЬ НА СТРАНИЦЕ
                    И ВЫВОДИТЬ ПО КЛЮЧЮ ПО ТАЙПУ ЗАГОТОВУ HTML ИЗ МАССИВА (ЕГО МОЖНО ХРАНИТЬ В ОТДЕЛНОМ ФАЙЛЕ)
                    И ПЕРЕБЕРАТЬ С ПОМОЩЬЮ SWITCH CASE
                    */
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            else if (item.col.length === 2)
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-6">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            else
            {
                item.col.forEach(function (item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-4">'
                    item.element.forEach(function (item, i, arr) {
                        //console.log(item)
                        if (item.type === "input")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if (item.type === "date")
                        {
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="date" class="form-control " id="${item.id}">
                                        <br>
                                    `
                        }
                    })
                    content += '</div>'
                })
            }
            content += '</div><br>'
        })
        content += '</div>'
    }
    else
    {
        content += `
                    <div class="alert alert-danger text-center font-weight-bold" role="alert">
                        Данных на странице не найдено! Добавьте колонки и элементы на страницу!
                    </div>
                `
    }
    resultPreview2.innerHTML = content;
}

buttonPreview2.addEventListener('click', preview)