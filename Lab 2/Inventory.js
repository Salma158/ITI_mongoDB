use Inventory

db.getCollection("products").find({})
db.getCollection("orders").find({})
db.getCollection("users").find({})


//Display number of products per category.
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            count: { $sum: 1 }
        }
    }
])

//Display max category products price.
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            maxPrice: { $max: "$price" }
        }
    }
])


//Display user ahmed orders populated with product.
db.users.aggregate([
  {
    $match: { "name": "ahmed" }
  },
  {
    $lookup: {
      from: "orders",
      localField: "ordersIds",
      foreignField: "_id",
      as: "orders"
    }
  },
  {
    $unwind: "$orders"
  },
  {
    $lookup: {
      from: "products",
      localField: "orders.productsIds",
      foreignField: "_id",
      as: "orders.products"
    }
  },
  {
    $project: {
      _id: 0,
      userName: "$name",
      orderDetails: "$orders"
    }
  }
])

//Get user ahemd highest order price.
db.users.aggregate([
  {
    $match: { "name": "ahmed" }
  },
  {
    $lookup: {
      from: "orders",
      localField: "ordersIds",
      foreignField: "_id",
      as: "orders"
    }
  },
  {
    $unwind: "$orders"
  },
  {
    $lookup: {
      from: "products",
      localField: "orders.productsIds",
      foreignField: "_id",
      as: "orders.products"
    }
  },
  {
    $unwind: "$orders.products"
  },
  {
    $group: {
      _id: "$_id",
      highestOrderPrice: { $max: "$orders.products.price" }
    }
  }
])





