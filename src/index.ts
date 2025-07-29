import { PrismaClient } from "./generated/prisma";

const client = new PrismaClient();


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
        }

    })
    console.log(response?.password);
}



createUser()
