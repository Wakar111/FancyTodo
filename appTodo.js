// get all Selectors
const addBtn = document.querySelector('.todo-btn')
const inputTodo = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// trigger Events
document.addEventListener('DOMContentLoaded', getTodoFromLocalStorage)
addBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)


// implement functions

function addTodo(event){
    // stop from submitting the form
    event.preventDefault();

    // this structure with js ...
    // <div class="todo-div">
    // <li class="todo-item">heyy</li>
    // <button><i class="fas fa-trash"></i></button>
    // <button><i class="far fa-check-square"></i></button>
    // </div>

    // create a Div with class of todos
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');
    
    // create li
    const todoLi = document.createElement('li');
    todoLi.innerHTML = inputTodo.value
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);

    // Add todo to localStorage
    saveTodoToLocalStorage(inputTodo.value)

    // create check buttons
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="far fa-check-square"></i>'
    checkBtn.classList.add('check-btn');
    todoDiv.appendChild(checkBtn);    
    
    // create delete buttons
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // append to Main Todo List
    todoList.appendChild(todoDiv)

    // clear input field
    inputTodo.value = '';
}

function deleteCheck(e){
    console.log(e.target)
    const item = e.target

    // delete Todo
    if (item.classList[0] === 'delete-btn'){
        const todo = item.parentElement
        // animation of remove
        todo.classList.add('animated-remove')
        // delete From LocalStorage
        deleteTodoFromLocalStorage(todo.innerText)
        // after animation is finish then remove that item
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }


    // check Todo
    if (item.classList[0] === 'check-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    console.log(e.target.value)
    const todos = todoList.childNodes

    todos.forEach(function(todo){
       switch(e.target.value){
           case 'all':
            todo.style.display = 'flex';
           break;
           case 'completed':
               if(todo.classList.contains('completed')){
                   todo.style.display = 'flex';
               } else {
                todo.style.display = 'none';
               }
           break;
           case 'uncompleted':
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            } else {
             todo.style.display = 'none';
            }
           break;
       }
    });
    console.log(todos)
}

function saveTodoToLocalStorage(todo){
    let todosArr;
    if(localStorage.getItem('todos') === null){
        todosArr = []
    } else {
        todosArr = JSON.parse(localStorage.getItem('todos'))
    }
    todosArr.push(todo);
    localStorage.setItem('todos', JSON.stringify(todosArr))
}

function getTodoFromLocalStorage(){
    let todosArr;
    if(localStorage.getItem('todos') === null){
        todosArr = []
    } else {
        todosArr = JSON.parse(localStorage.getItem('todos'))
    }
    todosArr.forEach((todo)=>{
        // create a Div with class of todos
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        
        // create li
        const todoLi = document.createElement('li');
        todoLi.innerHTML = todo
        todoLi.classList.add('todo-item');
        todoDiv.appendChild(todoLi);

        // create check buttons
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="far fa-check-square"></i>'
        checkBtn.classList.add('check-btn');
        todoDiv.appendChild(checkBtn);    
        
        // create delete buttons
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn);

        // append to Main Todo List
        todoList.appendChild(todoDiv)
    })
}

function deleteTodoFromLocalStorage(todo){
    let todosArr;
    if(localStorage.getItem('todos') === null){
        todosArr = []
    } else {
        todosArr = JSON.parse(localStorage.getItem('todos'))
    }
    todosArr.splice(todosArr.indexOf(todo), 1)
    localStorage.setItem('todos', JSON.stringify(todosArr))
 }