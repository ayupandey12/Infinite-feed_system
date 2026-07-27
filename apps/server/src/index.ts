import "dotenv/config"
import {prisma} from "@repo/db"
const user=await prisma.post.findMany({});
console.log(user)