db.getCollection("bookscoll").find({})

db.bookscoll.aggregate([
   {
      $match: { status: "PUBLISH" }
   },
   {
      $count: "publishedCount"
   }
])

db.bookscoll.aggregate([
   {
      $group: {
         _id: "$categories",
         bookCount: { $sum: 1 }
      }
   }
])

db.bookscoll.aggregate([
   {
      $sort: { publishedDate: -1 }
   },
   {
      $limit: 5
   }
])


db.bookscoll.aggregate([
   {
      $skip: 2
   },
   {
      $limit: 5
   }
])

db.bookscoll.aggregate([
   {
      $unwind: "$categories"
   },
   {
      $sortByCount: "$categories"
   }
])

db.bookscoll.aggregate([
    {
        $addFields: {
            titleAndAuthors: { $concat: ["$title", " by ", { $arrayElemAt: ["$authors", 0] }] }
        }
    }
])

db.bookscoll.aggregate([
    {
        $project: {
            title: 1,
            publishedDateFormatted: {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$publishedDate"
                }
            }
        }
    }
])

db.bookscoll.aggregate([
  {
    $project: {
      title: 1,
      firstAuthor: { $first: "$authors" }
    }
  }
])


db.bookscoll.aggregate([
  {
    $addFields: {
      firstAuthor: { $arrayElemAt: ["$authors", 0] }
    }
  }
])

db.bookscoll.aggregate([
  {
    $match: {
      $expr: {
        $gt: [{ $getField: "pageCount" }, 500]
      }
    }
  },
  {
    $project: {
      title: 1,
      pageCount: 1
    }
  }
])
