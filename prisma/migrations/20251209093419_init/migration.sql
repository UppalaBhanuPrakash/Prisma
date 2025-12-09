-- CreateTable
CREATE TABLE "Categories" (
    "CategoryID" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Products" (
    "ProductID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Price" DECIMAL(65,30) NOT NULL,
    "StockQuantity" INTEGER NOT NULL DEFAULT 0,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CategoryID" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Address" TEXT,
    "Phone" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Orders" (
    "OrderID" SERIAL NOT NULL,
    "TotalAmount" DECIMAL(65,30) NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'pending',
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "OrderItemID" SERIAL NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "PriceAtPurchase" DECIMAL(65,30) NOT NULL,
    "OrderID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("OrderItemID")
);

-- CreateTable
CREATE TABLE "Payments" (
    "PaymentID" SERIAL NOT NULL,
    "Amount" DECIMAL(65,30) NOT NULL,
    "Method" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'pending',
    "TransactionReference" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "OrderID" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("PaymentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Categories"("CategoryID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE CASCADE ON UPDATE CASCADE;
