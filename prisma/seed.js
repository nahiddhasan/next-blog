const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const categories = [
    {
        title:"Cooking",
        slug:"cooking"
    },
    {
        title:"Lifestyle",
        slug:"lifestyle"
    },
    {
        title:"Technology",
        slug:"technology",
    },
   { 
        title:"Finance", 
        slug:"finance"},
    {
        title:"Health",
        slug:"health"},
    {
        title:"Parenting", 
        slug:"parenting"
    },
    {
        title:"Crafts", 
        slug:"crafts"
    } ,
   {
        title:"Gardening", 
        slug:"gardening"
    },
   {
        title: "Education", 
        slug: "education"
    },
   { 
        title:"Relationships", 
        slug:"relationships"
    },
    {
        title:"Traveling", 
        slug: "traveling"
    },
    {
        title:"Photography", 
        slug: "photography"
    },
    {
        title:"History", 
        slug:"history"
    },
    {
        title:"Sports", 
        slug:"sports"
    },
    {
        title:"Hobbies", 
        slug:"hobbies"
    },
    {
        title:"Itineraries", 
        slug: "itineraries"
    },
    {
        title:"Fashion", 
        slug: "fashion"
    },
    {
        title:"Product" ,
        slug: "product"
    }
];
async function main() {
    const category = await prisma.Category.createMany({
        data:categories,
      });
console.log(category)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })