
const getElement = (tagName) =>{
    return document.getElementsByTagName(tagName);
}

const getClassElement = (className) =>{
    return document.getElementsByClassName(className);
}

const CallForEach = (DOMElement,event,functionName) =>{
    
    Array.prototype.forEach.call(DOMElement,(elem)=>{
        elem.addEventListener(`${event}`,functionName);
    });
}

const getClicked = () =>{
    return event.currentTarget.parentNode.parentNode;
}

const getType = () =>{
    return event.currentTarget;
}


const handleSubmit = () =>{

    event.preventDefault();
    
    let data = {
        todo : getElement('input')[0].value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST','/',true);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
    location.reload();
}

const handleEdit = () => {
    

    let data = {
        todo : prompt('Enter task to update...')
    }

    if(data.todo.length < 2 ){
        alert('please add a task to updated...');
        return;
    }

    let objId = getClicked().getElementsByTagName('span')[0].getAttribute('data-todo-id')
    
    let xhr = new XMLHttpRequest();
    xhr.open('PUT',`/${objId}?cbFunction=edit`,true);
    xhr.setRequestHeader('Content-type','application/json;chaset=UTF-8');
    xhr.send(JSON.stringify(data));
    location.reload();

}

const handleRemove = () => {
    
    let data = {
        objId : getClicked().getElementsByTagName('span')[0].getAttribute('data-todo-id')
    }
    
    let type =  getType().getAttribute('data-todo-type');
    
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE',`/${type}`,true);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
    location.reload();
}

const handleCompleted = () => {
    
    let data = {
        objId : getClicked().getElementsByTagName('span')[0].getAttribute('data-todo-id')
    }

    let type = getType().getAttribute('data-todo-type');

    let xhr = new XMLHttpRequest();
    xhr.open('PUT',`/${type}?cbFunction=completed`,true);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
    location.reload();

}

getElement("form")[0].addEventListener('submit',handleSubmit);

let btnEdit = getClassElement("btn-edit") , btnRemove = getClassElement("btn-remove"),
    btnCompleted = getClassElement("btn-completed");


CallForEach(btnEdit,'click',handleEdit);
CallForEach(btnRemove,'click',handleRemove);
CallForEach(btnCompleted,'click',handleCompleted);