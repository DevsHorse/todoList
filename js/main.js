'use strict';

const input = document.querySelector('.header-input'),
      inputPlus = document.getElementById('add'),
      ulTodo = document.getElementById('todo'),
      ulTodoCompleted = document.getElementById('completed');

/*
    Function for create li elements 
*/

function createElement(text) {
    let li = document.createElement('li'),
        span = document.createElement('span'),
        div = document.createElement('div'),
        buttonRemove = document.createElement('button'),
        buttonComlete = document.createElement('button');

        li.classList.add('todo-item');
        span.classList.add('todo-text');
        div.classList.add('todo-buttons');
        buttonRemove.classList.add('todo-remove');
        buttonComlete.classList.add('todo-complete');

        li.appendChild(span);
        li.appendChild(div);
        div.appendChild(buttonRemove);
        div.appendChild(buttonComlete);
        span.textContent = text;

    return li;
}

/*
    Function for save to localStorage
*/

function save() {
    let todoItems = ulTodo.querySelectorAll('.todo-item');
    let completeItems = ulTodoCompleted.querySelectorAll('.todo-item');

    let todo = [];
    let completeTodo = [];

        function pushValue(list, arr) {
            for (let i = 0; i < list.length; i++) {
                arr.push(list[i].querySelector('.todo-text').textContent);
            }
        } 

    pushValue(todoItems, todo);
    pushValue(completeItems, completeTodo);
    localStorage.setItem('todo', todo);
    localStorage.setItem('completeTodo', completeTodo);
}

/*
    todoApp object 
*/

let todoApp = {
    setNewTodo() {
        let listItem = createElement(input.value);

            if (input.value) {
                ulTodo.appendChild(listItem);
                input.value = '';
                save();
                this.listener(listItem);
            }
    },
    listener(li) {
        let removeBtn = li.querySelector('.todo-remove');
        let completeBtn = li.querySelector('.todo-complete');

        removeBtn.addEventListener('click', this.deleteTodoItem);
        completeBtn.addEventListener('click', this.toggleComplete);
    },
    deleteTodoItem() {
        let li = this.parentNode.parentNode;
        let ul = li.parentNode;

        ul.removeChild(li);
        save();
    },
    toggleComplete() {
        let li = this.parentNode.parentNode;

            if (li.classList.contains('compl')) {
                li.classList.remove('compl');
                ulTodo.appendChild(li);
            } else {
                li.classList.add('compl');
                ulTodoCompleted.appendChild(li);
            }
            
        save();
    }
};

/*
    input's listener 
*/

inputPlus.addEventListener('click', e => {
    e.preventDefault();
    todoApp.setNewTodo.call(todoApp);
});

/*
    function for geting data of localStorage 
*/

(function getDataOfLS() {
    let todo = localStorage.getItem('todo').split(',');
    let completeTodo = localStorage.getItem('completeTodo').split(',');

        function showDataItems(list) {
            if (list[0] !== '') {
                for (let i = 0; i < list.length; i++) {
                    let listItem = createElement(list[i]);
                    if (list === completeTodo) {
                        listItem.classList.add('compl');
                        ulTodoCompleted.appendChild(listItem);
                    } else {
                        ulTodo.appendChild(listItem);
                    }
                    todoApp.listener(listItem);
                }
            } 
        }
        
    showDataItems(todo);
    showDataItems(completeTodo);
})();