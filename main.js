const buttonPreview = document.getElementById('preview'),
    resultPreview = document.querySelector('#result')

let fff = [
    {
        idRow: "1",
        nameRow: "Название области",
        col: [
            {
                idCol: "row1/col1",
                element: [
                    {id: 1,textInput: "wdwdwd",type: "input"}
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
    if(fff !== []){
        //console.log(fff)
        content += '<div class="container-fluid rounded border border-primary">'
        fff.forEach(function(item, i, arr) {
            //console.log(item.col)
            content += '<div class="row">'
            content += `<h5 class="text-center mb-2">${item.nameRow}</h5>`
            if(item.col.length === 1){
                item.col.forEach(function(item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-12">'
                    /*
                    МБ СОЗДАТЬ МАССИВ С ЭЛЕМЕНТАМИ УЖЕ ГОТОВЫМИ КОТОРЫЕ ДОЛЖНЫ БЫТЬ НА СТРАНИЦЕ
                    И ВЫВОДИТЬ ПО КЛЮЧЮ ПО ТАЙПУ ЗАГОТОВУ HTML ИЗ МАССИВА (ЕГО МОЖНО ХРАНИТЬ В ОТДЕЛНОМ ФАЙЛЕ)
                    И ПЕРЕБЕРАТЬ С ПОМОЩЬЮ SWITCH CASE
                    */
                    item.element.forEach(function(item, i, arr) {
                        //console.log(item)
                        if(item.type === "input"){
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        }
                        else if(item.type === "date"){
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
            else if(item.col.length === 2){
                item.col.forEach(function(item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-6">'
                    item.element.forEach(function(item, i, arr) {
                        //console.log(item)
                        if(item.type === "input"){
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        } else if(item.type === "date"){
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
            else {
                item.col.forEach(function(item, i, arr) {
                    //console.log(item)
                    content += '<div class="col-4">'
                    item.element.forEach(function(item, i, arr) {
                        //console.log(item)
                        if(item.type === "input"){
                            content += `
                                        <label for="${item.id}">${item.textInput}</label>
                                        <input type="text" class="form-control" id="${item.id}">
                                        <br>
                                    `
                        } else if(item.type === "date"){
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
    } else {
        content += `
                    <div class="alert alert-danger text-center font-weight-bold" role="alert">
                        Данных на странице не найдено! Добавьте колонки и элементы на страницу!
                    </div>
                `
    }
    resultPreview.innerHTML = content;
}
buttonPreview.addEventListener('click', preview)