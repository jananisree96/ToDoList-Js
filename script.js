document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filters = document.querySelectorAll('.filters button');
    let todos = [];

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        if (task) {
            addTodo(task);
            todoInput.value = '';
        }
    });

    function addTodo(task) {
        const todo = {
            id: Date.now(),
            task: task,
            isCompleted: false
        };
        todos.push(todo);
        renderTodos(todos);
    }

    function renderTodos(todosToRender) {
        todoList.innerHTML = '';
        todosToRender.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.isCompleted ? 'completed' : '';
            li.innerHTML = `
                ${todo.task}
                <button class="complete-btn" data-id="${todo.id}">✔</button>
                <button class="delete-btn" data-id="${todo.id}">✖</button>
            `;
            todoList.appendChild(li);
        });
    }

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            toggleComplete(e.target.dataset.id);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTask(e.target.dataset.id);
        }
    });

    function toggleComplete(id) {
        todos = todos.map(todo => todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
        renderTodos(todos);
    }

    function deleteTask(id) {
        todos = todos.filter(todo => todo.id != id);
        renderTodos(todos);
    }

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterType = filter.id;
            let filteredTodos = [];
            if (filterType === 'all') {
                filteredTodos = todos;
            } else if (filterType === 'active') {
                filteredTodos = todos.filter(todo => !todo.isCompleted);
            } else if (filterType === 'completed') {
                filteredTodos = todos.filter(todo => todo.isCompleted);
            }
            renderTodos(filteredTodos);
        });
    });
});
