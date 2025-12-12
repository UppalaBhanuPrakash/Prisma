import prisma from "../prismaClient.js";

async function main() {
  console.log(" Seeding database...");
  await prisma.category.createMany({
    data: [
      { CategoryName: "Electronics" },
      { CategoryName: "Books" },
      { CategoryName: "Clothing" },
      { CategoryName: "Home Appliances" },
      { CategoryName: "Sports Equipment" },
      { CategoryName: "Toys" },
      { CategoryName: "Groceries" },
      { CategoryName: "Furniture" },
      { CategoryName: "Mobile Accessories" },
      { CategoryName: "Beauty Products" },
    ],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      { Name: "Laptop", Description: "Gaming laptop", Price: 1200, StockQuantity: 10, CategoryID: 1 },
      { Name: "Smartphone", Description: "Android Phone", Price: 500, StockQuantity: 20, CategoryID: 1 },
      { Name: "Headphones", Description: "Noise Cancelling", Price: 80, StockQuantity: 50, CategoryID: 9 },
      { Name: "Novel Book", Description: "Fiction story", Price: 15, StockQuantity: 100, CategoryID: 2 },
      { Name: "T-Shirt", Description: "Cotton shirt", Price: 12, StockQuantity: 200, CategoryID: 3 },
      { Name: "Refrigerator", Description: "Double Door", Price: 850, StockQuantity: 5, CategoryID: 4 },
      { Name: "Football", Description: "Standard size", Price: 25, StockQuantity: 40, CategoryID: 5 },
      { Name: "Toy Car", Description: "Electric toy car", Price: 30, StockQuantity: 30, CategoryID: 6 },
      { Name: "Couch", Description: "Soft fabric couch", Price: 350, StockQuantity: 7, CategoryID: 8 },
      { Name: "Perfume", Description: "Premium fragrance", Price: 60, StockQuantity: 15, CategoryID: 10 },
    ],
    skipDuplicates: true,
  });


  const extraProducts = [];
  for (let i = 1; i <= 190; i++) {
    extraProducts.push({
      Name: `Product ${i}`,
      Description: `Auto-generated product ${i}`,
      Price: (i % 50) + 10,
      StockQuantity: (i % 100) + 1,
      CategoryID: ((i % 10) + 1),
    });
  }

  await prisma.product.createMany({
    data: extraProducts,
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: [
      { Username: "john", Email: "john@example.com", PasswordHash: "hash1", Address: "Street 1", Phone: "123456789" },
      { Username: "emma", Email: "emma@example.com", PasswordHash: "hash2", Address: "Street 2", Phone: "987654321" },
      { Username: "mike", Email: "mike@example.com", PasswordHash: "hash3", Address: "Street 3", Phone: "998877665" },
      { Username: "sara", Email: "sara@example.com", PasswordHash: "hash4", Address: "Street 4", Phone: "776655443" },
      { Username: "lucas", Email: "lucas@example.com", PasswordHash: "hash5", Address: "Street 5", Phone: "889900112" },
      { Username: "david", Email: "david@example.com", PasswordHash: "hash6", Address: "Street 6", Phone: "665544332" },
      { Username: "laura", Email: "laura@example.com", PasswordHash: "hash7", Address: "Street 7", Phone: "554433221" },
      { Username: "james", Email: "james@example.com", PasswordHash: "hash8", Address: "Street 8", Phone: "443322110" },
      { Username: "olivia", Email: "olivia@example.com", PasswordHash: "hash9", Address: "Street 9", Phone: "332211009" },
      { Username: "chris", Email: "chris@example.com", PasswordHash: "hash10", Address: "Street 10", Phone: "221100998" },
    ],
    skipDuplicates: true,
  });

  const extraUsers = [];
  for (let i = 1; i <= 190; i++) {
    extraUsers.push({
      Username: `user${i}`,
      Email: `user${i}@example.com`,
      PasswordHash: `hash${i}`,
      Address: `Street ${i}`,
      Phone: `900000${i}`,
    });
  }

  await prisma.user.createMany({
    data: extraUsers,
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany({ select: { UserID: true } });
  const userIDs = users.map(u => u.UserID);

  const getRandomUserID = () =>
    userIDs[Math.floor(Math.random() * userIDs.length)];

  const ordersData = [];
  for (let i = 1; i <= 10; i++) {
    ordersData.push({
      TotalAmount: 100 + i * 10,
      Status: "pending",
      UserID: getRandomUserID(),
    });
  }

  await prisma.order.createMany({
    data: ordersData,
    skipDuplicates: true,
  });

  const extraOrders = [];
  for (let i = 1; i <= 190; i++) {
    extraOrders.push({
      TotalAmount: 100 + i * 5,
      Status: "pending",
      UserID: getRandomUserID(),
    });
  }

  await prisma.order.createMany({
    data: extraOrders,
    skipDuplicates: true,
  });

  const orders = await prisma.order.findMany({ select: { OrderID: true } });
  const orderIDs = orders.map(o => o.OrderID);

  const products = await prisma.product.findMany({ select: { ProductID: true } });
  const productIDs = products.map(p => p.ProductID);

  const getRandomOrderID = () =>
    orderIDs[Math.floor(Math.random() * orderIDs.length)];

  const getRandomProductID = () =>
    productIDs[Math.floor(Math.random() * productIDs.length)];

  const orderItemData = [];
  for (let i = 1; i <= 10; i++) {
    orderItemData.push({
      Quantity: (i % 5) + 1,
      PriceAtPurchase: 20 + i * 5,
      OrderID: getRandomOrderID(),
      ProductID: getRandomProductID(),
    });
  }

  await prisma.orderItem.createMany({
    data: orderItemData,
    skipDuplicates: true,
  });


  const extraOrderItems = [];
  for (let i = 1; i <= 190; i++) {
    extraOrderItems.push({
      Quantity: (i % 5) + 1,
      PriceAtPurchase: 20 + (i % 50),
      OrderID: getRandomOrderID(),
      ProductID: getRandomProductID(),
    });
  }

  await prisma.orderItem.createMany({
    data: extraOrderItems,
    skipDuplicates: true,
  });

  const paymentData = [];
  for (let i = 1; i <= 10; i++) {
    paymentData.push({
      Amount: 100 + i * 10,
      Method: "card",
      Status: "completed",
      TransactionReference: `TXN-${i * 12345}`,
      OrderID: getRandomOrderID(),
    });
  }

  await prisma.payment.createMany({
    data: paymentData,
    skipDuplicates: true,
  });

  const extraPayments = [];
  for (let i = 1; i <= 190; i++) {
    extraPayments.push({
      Amount: 100 + i * 10,
      Method: "card",
      Status: "completed",
      TransactionReference: `TXN-${i * 54321}`,
      OrderID: getRandomOrderID(),
    });
  }

  await prisma.payment.createMany({
    data: extraPayments,
    skipDuplicates: true,
  });

  console.log(" Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
