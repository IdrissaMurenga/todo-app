// VARIABLES
let TODO_ARRAY = [];

const STORE_KEY = "Taskes";

// REFERENCES
const todoInputRef = document.querySelector("#todoInput");
const nameInputRef = document.querySelector("#nameInput");
const addressInputRef = document.querySelector("#addressInput");
const cardInputRef = document.querySelector("#cardInput");
const taskInputRef = document.querySelector("#taskInput");
const dateInputRef = document.querySelector("#dateInput");

const displayDataRef = document.querySelector("#displayData");
const addTsakBtnRef = document.querySelector("#addTaskBtn");
const updateTaskBtnRef = document.querySelector("#updateTaskBtn");
const searchDataRef = document.querySelector("#searchData")
const formRef = document.querySelector("#form");
const headerRef = document.querySelector("#header");
const overDue = document.querySelector("#overDue")
const newIdRef = document.querySelector("#newId")


// FUNCTIONS

// function to add data into array and save that array in localStorage
const saveTodoData = (arrayData, data, STORE_KEY) => {
    // add an object into array
    arrayData.push(data)   
    
    // save array from localStorage
    localStorage.setItem(STORE_KEY, JSON.stringify(arrayData))
    
    display(arrayData)
}

// function to check if datas exist in localstorage and retrieve them
const getTodoData = (STORE_KEY) => {
    if (localStorage.getItem(STORE_KEY) !== null) {
        return JSON.parse(localStorage.getItem(STORE_KEY))
    }return null
}

// function to check if data is not exist and add that data to localstorage
const saveAndGetData = (arrayData, data, STORE_KEY) => {
    if (localStorage.getItem(STORE_KEY) === null) {
        saveTodoData(arrayData, data, STORE_KEY)
    } return getTodoData(STORE_KEY)
    
}


// function to display on page saved data
const display = (arrayData) => {
    displayDataRef.innerHTML = ""
    // loop inside the array and distructuring object data to access them
    arrayData.map(({ date, todo, names, address, card, task, id }) => {
        displayDataRef.innerHTML += `
            <div class="date">
                <h5 class="flex_display alignment"><span><img class="circle_svg" src ="./assets/icons/circle-svgrepo-com.svg"></span>${date}</h5>
            </div>
            <div class="section3_container flex_display position alignment flex-wrap">
                <div>
                    <div class="flex_display alignment measure">
                        <div>
                            <img class="white_hamburger" src="./assets/icons/white hamburger list.svg" alt="white hamburger">
                        </div>
                        <div>
                            <div class="check measure flex_display alignment">
                                <div>
                                    <input type="checkbox" name="">
                                    <label for="">${todo}</label>
                                </div>
                                <h6>OVERDUE</h6>
                            </div>
                            <div class="measure flex_display flex-wrap">
                                <h4 class="flex_display"><span><img class="detail_img" src="./assets/icons/profile.svg" alt="ptofile"></span>${names}</h4>
                                <h4 class="flex_display" ><span><img class="detail_img" src="./assets/icons/white house.svg" alt="white house"></span>${address}</h4>
                                <h4 class="flex_display"><span><img class="detail_img" src="./assets/icons/business card.svg" alt="card"></span>${card}</h4>
                            </div>
                        </div>
                    </div>
                    <p class="text" id="text">${task}</p>
                </div>
                <div class="buttons flex_display flex-wrap">
                    <div>
                        <button class="complete_btn" id="completeBtn" data-tpye ="completeBtn" >Mark Complete</button>
                    </div>
                    <div class="icon_btn flex_display">
                        <img class="task_icon" data-id ="${id}" data-type = "edit-icon" src="./assets/icons/pen.svg" alt="pen">
                        <img class="task_icon" data-id ="${id}" data-type = "delete_icon" src="./assets/icons/trash bin.svg" alt="trash">
                    </div>
                </div>
            </div>
        `
    })
}

// function to delete a specified data on localstorage and on page
const deleteData = (arrayData,idData,STORE_KEY) => {
    const newData = arrayData.filter(({ id }) => {
        if (id !== idData) {
            return arrayData
        }
    });
    localStorage.setItem(STORE_KEY, JSON.stringify(newData));

    display(newData)
}

// function to display data to be edited in input field
const displayDataInInputes = (arrayData, idData) => {

    // find if data exist and return that data
    const findData = arrayData.find((inputes) => {
        if (inputes.id === idData) {
            return arrayData
        }
    })
    // destructuring the object
    const { date, todo, names, address, card, task , id } = findData
    // getting object values
    todoInputRef.value = todo
    nameInputRef.value = names
    addressInputRef.value = address
    cardInputRef.value = card
    taskInputRef.value = task
    dateInputRef.value = date
    newId.value = id
}

// function to display edited data on page
const displayEditedData = (arrayData, STORE_KEY) => {
    // getting inputes value
    const todoInputValue = todoInputRef.value
    const nameInputValue = nameInputRef.value
    const addressInputValue = addressInputRef.value
    const cardInputValue = cardInputRef.value
    const taskInputValue = taskInputRef.value
    const dateInputValue = dateInputRef.value
    const newIdValue = parseInt(newId.value)   

    // created ana object with new value in inputes
    const newInputesData = {
        todo: todoInputValue,
        names: nameInputValue,
        address: addressInputValue,
        card: cardInputValue,
        task: taskInputValue,
        date: dateInputValue,
        id: newIdValue,
    }
    // variable to get a specified task in localstorage
    const getArrayData = getTodoData(STORE_KEY)

    // deleting a task got in localstorage
    const newEditedData = getArrayData.filter(({ id }) => {
        if (id !== newIdValue) {
            return arrayData
        }
    })

    // call a function to save new edited task and display the task
    saveTodoData(newEditedData, newInputesData, STORE_KEY)
}

// function to keep datas displayed on page after refresh or when page is opened
const initData = () => {
    // variable to get saved data on localstorage
    let todoArray = getTodoData(STORE_KEY)

    // check if local storage is not empty and display what is on localstorage
    if (todoArray !== null) {
        TODO_ARRAY = todoArray
        overDue.textContent = TODO_ARRAY.length
        display(TODO_ARRAY)
    }
}

// EVENTS

// form events
formRef.addEventListener("submit", (e) => {
    e.preventDefault()

    const submitBtn = e.submitter.id
    const todoInputValue = todoInputRef.value
    const nameInputValue = nameInputRef.value
    const addressInputValue = addressInputRef.value
    const cardInputValue = cardInputRef.value
    const taskInputValue = taskInputRef.value
    const dateInputValue = dateInputRef.value
    const todoId = Date.now()

    const inputesData = {
        date : dateInputValue,
        todo : todoInputValue,
        names : nameInputValue,
        address : addressInputValue,
        card : cardInputValue,
        task: taskInputValue,
        id : todoId
    }
    
    if (submitBtn === "addTaskBtn") {      
        saveTodoData(TODO_ARRAY, inputesData, STORE_KEY)
        saveAndGetData(TODO_ARRAY, inputesData, STORE_KEY)
        initData()
        formRef.reset()
    }

    if (submitBtn === "updateTaskBtn") {
        displayEditedData(TODO_ARRAY, STORE_KEY)
        formRef.reset()
    }
})

document.addEventListener("click", (e) => {
    const idData = parseInt(e.target.dataset.id)
    const newArray = getTodoData(STORE_KEY)
    if (e.target.nodeName === "IMG") { 
        if (e.target.dataset.type === "delete_icon") {
            if (newArray !== null) {
                TODO_ARRAY = newArray
                deleteData(TODO_ARRAY,idData,STORE_KEY)
            }
            initData()
        }

        if (e.target.dataset.type === "edit-icon") {
            headerRef.classList.remove("display_header")
            addTsakBtnRef.style.display = "none"
            updateTaskBtnRef.style.display = "block"
            displayDataInInputes(TODO_ARRAY, idData)
        }
    }

    if (e.target.nodeName === "BUTTON") {
        if (e.target.dataset.type === "headerBtn") {
            headerRef.classList.toggle("display_header")
            updateTaskBtnRef.style.display = "none"
        }
    }
})

// searchDataRef.addEventListener("input", (e) => {

// })

initData()