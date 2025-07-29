import { PrismaClient } from "./generated/prisma";

const client = new PrismaClient();

client.user.create({
    data:{
        username:"Harkirat",
        password:"123123",
        age:21,
        city:"Delhi"
    }
})


