import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { todos ,addTodoItem,removeTodoItem,retrieveTodoItemById,updateTodoItemById} from "./todos";

const app:Express = express();
dotenv.config()

const port:string|number = process.env.PORT||3000;
app.use(express.json())
/**
 *  Get all Todos items
 *  GET http://localhost:3000/api/todos
 *  Adding a query string to a route
 *  http://localhost:3000/api/todos/?completed=true or http://localhost:3000/api/todos/?completed=false
 */

app.get("/api/todos/",(req:Request,res:Response)=>{
    console.log(req.query)
    res.json(todos)
})

app.get("/api/todos/:id",(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id,10)
    const todoItem:{id:number,title:string,completed:boolean}|{} = retrieveTodoItemById(id);
    res.send(todoItem)
})

app.post("/api/todos/",(req:Request,res:Response)=>{
    const todoItem:{id:number,title:string,completed:boolean} = req.body;
    addTodoItem(todoItem)
    return res.status(201).json(todoItem);
})


app.put("/api/todos/:id",(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id,10);
    const todoItemForUpdate:{title:string,completed:boolean} = req.body;
    const result = updateTodoItemById(id,todoItemForUpdate);
    if(result){
        res.json(result)
    }else{
        res.status(404).json({message:"Todo nor found."})
    }
})

app.delete("/api/todos/:id",(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id,10);
    const success:boolean = removeTodoItem(id);

    if(success){
        res.send({message:"Todo item deleted."});
    }else{
        res.status(404).json({ message: 'Todo item not found' });
    }

})

app.listen(port,()=>{
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});