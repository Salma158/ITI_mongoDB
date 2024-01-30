use FacultySystemDB

db.createCollection("student")

db.student.insertOne({
    FirstName : "salma", 
    LastName : "sherif", 
    Age : 22, 
    Faculty : {
        Name : "computer science",
        Address : "capital"
    },
    Grades : [
        {
            CourseName : "linux",
            Grade : "A",
            Pass : true
        },
        {
            CourseName : "oop",
            Grade : "A",
            Pass : true
        },
        {
            CourseName : "c++",
            Grade : "A",
            Pass : true
        }
    ],
    IsFired : false
})

db.student.insertMany([{
        FirstName : "mina", 
        LastName : "nagy", 
        Age : 30, 
        Faculty : "engineering",
        Grades : [
            {
                CourseName : "c",
                Grade : "A",
                Pass : true
            },
            {
                CourseName : "c++",
                Grade : "A",
                Pass : true
            },
            {
                CourseName : "mongo",
                Grade : "A",
                Pass : true
            }
        ],
        IsFired : true
    },
    {
        FirstName : "nour", 
        LastName : "sherif", 
        Age : 26, 
        Faculty : {
            Name : "IT",
            Address : "maadi"
        },
        Grades : [
            {
                CourseName : "mongo",
                Grade : "A",
                Pass : true
            },
            {
                CourseName : "data structure",
                Grade : "B",
                Pass : true
            },
            {
                CourseName : "Java",
                Grade : "A",
                Pass : true
            }
        ],
        IsFired : false
    }
])
    
db.student.find()

db.student.find({ FirstName: "mina" })

db.student.find({ $or: [{ FirstName: "Ahmed" }, { LastName: "Ahmed" }] })

db.student.find({ FirstName: { $ne: "Ahmed" } })

db.student.find({ Age: { $gte: 21 }, "Faculty": { $ne: null } })

db.student.find({ FirstName: "salma" }, { FirstName: 1, LastName: 1, IsFired: 1, _id: 0 })

db.student.updateOne({ FirstName: "salma" }, { $set: { LastName: "iti" } })

db.student.deleteMany({ IsFired: true })

db.student.deleteMany({})

db.dropDatabase()   
