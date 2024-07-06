export const todos:{id:number,title:string,completed:boolean}[] = [
    {id:1,title:'Learn NodeJs',completed:true},
    {id:2,title:'Master Express',completed:false},
    {id:3,title:'Build an API Server',completed:false},
]


export const nextTodoId = ():number=>{

    let maxId:number = 1;
    todos.forEach((todo:{id:number,title:string,completed:boolean})=>{
        if(todo.id>maxId){
            maxId = todo.id
        }
    });

    return maxId+1;
}

export const addTodoItem = (item:{id:number,title:string,completed:boolean})=>{
    todos.push(item)
}

export const removeTodoItem = (id:number):boolean=>{
    const index:number = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        return true;
    }
    return false;
}

export const retrieveTodoItemById = (id:number):{id:number,title:string,completed:boolean}|{}=>{
    const todoItem:{id:number,title:string,completed:boolean}|undefined = todos.find(todo => todo.id === id)
    if(todoItem===undefined){
        return {}
    }
    return todoItem;
}

export const updateTodoItemById = (id:number,updateTodoItem:{title:string,completed:boolean})=>{
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...updateTodoItem };
        return todos[todoIndex];
    }
    return undefined;
}
