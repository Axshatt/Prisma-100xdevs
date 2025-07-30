import { PrismaClient } from "../prisma/prisma";
import express from "express";

const app = express();

app.use(express.json())

const client = new PrismaClient();


app.get("/users", async (req, res) => {
    const users = await client.user.findMany();

    res.json({
        users
    })
})

app.get("/todos/:id", async (req, res) => {
    // just making the typescript happy here
    const id = req.params.id;
    const users = await client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            todos: true,
            username:true,
            password:true,
        }
    });

    res.json({
        users
    })
})



async function createUser() {
    // create
    client.user.create({
        data: {
            username: "Harkirat",
            password: "123123",
            age: 21,
            city: "Delhi"
        }
    })
}

async function updateUser() {
    //update
    client.user.update({
        where: {
            id: 1,
        },
        data: {
            username: "Harkirat",
        }
    })
}
async function FindUser() {

    // reading data ot user/users
    const response = await client.user.findFirst({
        where: {
            id: 1,
        },
        include: {
            todos: true

        }

    })
    console.log(response?.password);
}



// createUser()
app.listen(3000)