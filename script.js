//UI variables ====================
const addTodoBtn = document.querySelector('.btn-add');
const activeTodosList = document.querySelector('.list-active');
const completedTodosList = document.querySelector('.list-completed');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#todo');
const warning = document.querySelector('.warning');
const closeWarningBtn = document.querySelector('.btn-warning-remove');

//Load all event listeners ====================
loadEventListeners();

function loadEventListeners() {
  // Add Todo event
  addTodoBtn.addEventListener('click', addTodoFromInput);
  // Close warning event
  closeWarningBtn.addEventListener('click', closeWarning);
  // Edit Todo
  activeTodosList.addEventListener('click', editTodo);
  completedTodosList.addEventListener('click', editTodo);
  // End editing Todo
  activeTodosList.addEventListener('focusout', endEditingTodo);
  completedTodosList.addEventListener('focusout', endEditingTodo);
  // Remove Todo
  activeTodosList.addEventListener('click', removeTodo);
  completedTodosList.addEventListener('click', removeTodo);
  // Tick to complete Todo
  activeTodosList.addEventListener('click', completeTodo);
  // Activate completed Todos
  completedTodosList.addEventListener('click', activateTodo);
  // Clear all Todos event
  clearBtn.addEventListener('click', clearTodos);
  // Filter Todos event
  filter.addEventListener('keyup', filterTodos);
}

// Add Todo ====================
function addTodo(liText, todosListType, btnCheckClasses, iconCheckWithClasses, textSpanClasses) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'list-item';
  
  // Create first span element (for flex alignment) and append it to li
  li.appendChild(document.createElement('span'));
  // Add class to first span element
  li.querySelectorAll('span')[0].className = 'left-side';
  // Save span.left-side in a variable
  const leftSideSpan = li.querySelector('span.left-side');
  // Create check button and append it to first span element
  leftSideSpan.appendChild(document.createElement('button'));
  // Add class to check button
  leftSideSpan.querySelector('button').className = btnCheckClasses; 
  // Add icon to check button
  leftSideSpan.querySelector('button').innerHTML = iconCheckWithClasses;
  // Create text span and append it to first span
  leftSideSpan.appendChild(document.createElement('span'));
  // Add class to text span
  leftSideSpan.querySelector('span').className = textSpanClasses;
  // Create text node and append it to text span
  leftSideSpan.querySelector('span.text').appendChild(document.createTextNode(liText));
  // Create textarea and append it to first span
  leftSideSpan.appendChild(document.createElement('textarea'));
  // Add class to textarea
  leftSideSpan.querySelector('textarea').className = 'li-text-edit';
  // Add attributes to text area
  leftSideSpan.querySelector('textarea').setAttribute('cols', '25');
  leftSideSpan.querySelector('textarea').setAttribute('rows', '3');
  
  // Create second span element (wrapper of rightside buttons) and append it to li
  li.appendChild(document.createElement('span'));
  // Add class to second span element
  li.querySelectorAll('span')[2].className = 'right-side';
  // Create edit button and append it to second span
  li.querySelector('span.right-side').appendChild(document.createElement('button'));
  // Add class to edit button
  li.querySelectorAll('span.right-side > button')[0].className = 'btn btn-edit btn-edit-margin';
  // Add icon to edit button
  li.querySelectorAll('span.right-side > button')[0].innerHTML = '<i class="fas fa-pen"></i>';
  // Create remove button and append it to second span
  li.querySelector('span.right-side').appendChild(document.createElement('button'));
  // Add class to remove button
  li.querySelectorAll('span.right-side > button')[1].className = 'btn btn-remove';
  // Add icon to remove button
  li.querySelectorAll('span.right-side > button')[1].innerHTML = '<i class="fas fa-times"></i>';
  
  // Append li to respective ul
  todosListType.appendChild(li);
}


// Add Todo From Input ====================
function addTodoFromInput() {
  if(todoInput.value === '') {
    warning.classList.add('show');
    return;
  }
  
  let liText = todoInput.value;
  let btnCheckClasses = 'btn btn-check btn-check-active';
  let iconCheckWithClasses = '<i class="fas fa-check fa-check-active"></i>';
  let textSpanClasses = 'text';
  addTodo(liText, activeTodosList, btnCheckClasses, iconCheckWithClasses, textSpanClasses);
  
  // Empty Add-Todo Input
  todoInput.value = '';
}

// Close Warning ====================
function closeWarning() {
  warning.classList.remove('show');
}

// Edit Todo
function editTodo(e) {
  let liTextEdit = '';
  let textSpan = '';
  
  if(e.target.classList.contains('btn-edit') || e.target.classList.contains('fa-pen')) {
    if(e.target.classList.contains('btn-edit')) {
      // Get the textarea of li
      liTextEdit = e.target.parentElement.previousElementSibling.children[2];
      // Get span.text of li
      textSpan = e.target.parentElement.previousElementSibling.children[1];
    } else if(e.target.classList.contains('fa-pen')) {
        // Get the textarea of li
        liTextEdit = e.target.parentElement.parentElement.previousElementSibling.children[2];
        // Get span.text of li
        textSpan = e.target.parentElement.parentElement.previousElementSibling.children[1];
    }
    
    // Show textarea of li
    liTextEdit.classList.add('show');
    // Hide text span of li
    textSpan.classList.add('hide');
    // Set content of textarea
    liTextEdit.textContent = textSpan.textContent;
    // Set focus on the textarea of li
    liTextEdit.focus();
  }
}

// End editing Todo
function endEditingTodo(e) {
  if(e.target.classList.contains('li-text-edit')) {
    // Get textarea
    let liTextEdit = e.target;
    // Get span.text of li
    let textSpan = e.target.previousElementSibling;
    // Hide textarea
    liTextEdit.classList.remove('show');
    // Show span.text
    textSpan.classList.remove('hide');
    // Set the edited content of textarea as content of span.text 
    textSpan.textContent = liTextEdit.value;
  }
}

// Remove Todo ====================
function removeTodo(e) {
  if(e.target.classList.contains('btn-remove')) {
    e.target.parentElement.parentElement.remove();
    } else if(e.target.classList.contains('fa-times')) {
        e.target.parentElement.parentElement.parentElement.remove();
      }
}

// Clear all Todos ====================
function clearTodos() {
  activeTodosList.innerHTML = '';
  completedTodosList.innerHTML = '';
}

// Filter Todos ====================
function filterTodos(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.list-item span.text').forEach(function (todo) {
        const item = todo.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            todo.parentElement.parentElement.style.display = 'flex';
        } else {
            todo.parentElement.parentElement.style.display = 'none';
        }
  });
}

// Complete Todo ====================
function completeTodo(e) {
  let liText = '';
  if(e.target.classList.contains('btn-check-active') || e.target.classList.contains('fa-check-active')) {
    if(e.target.classList.contains('btn-check-active')) {
      liText = e.target.nextElementSibling.textContent;
      e.target.parentElement.parentElement.remove();
    } else if(e.target.classList.contains('fa-check-active')) {
        liText = e.target.parentElement.nextElementSibling.textContent;
        e.target.parentElement.parentElement.parentElement.remove();
    }
      
    let btnCheckClasses = 'btn btn-check btn-check-completed';
    let iconCheckWithClasses = '<i class="fas fa-check black-tick fa-check-completed"></i>';
    let textSpanClasses = 'text strike-through';
    addTodo(liText, completedTodosList, btnCheckClasses, iconCheckWithClasses, textSpanClasses);  
  }
} 

// Activate completed Todos ====================
function activateTodo(e) {
  let liText = '';
  if(e.target.classList.contains('btn-check-completed') || e.target.classList.contains('fa-check-completed')) {
    if(e.target.classList.contains('btn-check-completed')) {
      liText = e.target.nextElementSibling.textContent;
      e.target.parentElement.parentElement.remove();
    } else if(e.target.classList.contains('fa-check-completed')) {
        liText = e.target.parentElement.nextElementSibling.textContent;
        e.target.parentElement.parentElement.parentElement.remove();
    }
  
    let btnCheckClasses = 'btn btn-check btn-check-active';
    let iconCheckWithClasses = '<i class="fas fa-check fa-check-active"></i>';
    let textSpanClasses = 'text';
    addTodo(liText, activeTodosList, btnCheckClasses, iconCheckWithClasses, textSpanClasses);
  } 
}

