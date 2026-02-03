/**
 * Cau 1: Khai bao constructor function Product de tao doi tuong san pham.
 * Cac thuoc tinh: id, name, price, quantity, category, isAvailable
 */
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

/**
 * Cau 2: Khoi tao mang products gom it nhat 6 san pham, thuoc toi thieu 2 danh muc khac nhau.
 */
const products = [
    new Product("P01", "iPhone 15 Pro Max", 34000000, 10, "Smartphones", true),
    new Product("P02", "Samsung Galaxy S24 Ultra", 29000000, 5, "Smartphones", true),
    new Product("P03", "AirPods Pro 2", 6000000, 0, "Accessories", true),
    new Product("P04", "MacBook Pro M3", 45000000, 3, "Laptops", true),
    new Product("P05", "Apple Watch Series 9", 11000000, 8, "Accessories", true),
    new Product("P06", "Sony WH-1000XM5", 8000000, 15, "Accessories", false)
];

console.log("--- Cau 2: Danh sach san pham khoi tao ---");
console.log(products);

/**
 * Cau 3: Tao mang moi chi chua: name, price cua moi san pham.
 */
const productSummary = products.map(p => ({
    name: p.name,
    price: p.price
}));
console.log("\n--- Cau 3: Danh sach ten va gia san pham ---");
console.log(productSummary);

/**
 * Cau 4: Loc ra cac san pham con hang trong kho (quantity > 0).
 */
const inStockProducts = products.filter(p => p.quantity > 0);
console.log("\n--- Cau 4: San pham con hang trong kho ---");
console.log(inStockProducts);

/**
 * Cau 5: Kiem tra xem co it nhat mot san pham co gia tren 30.000.000 hay khong.
 */
const hasExpensiveProduct = products.some(p => p.price > 30000000);
console.log("\n--- Cau 5: Co san pham tren 30 trieu khong? ---");
console.log(hasExpensiveProduct ? "Co" : "Khong");

/**
 * Cau 6: Kiem tra xem tat ca san pham thuoc danh muc "Accessories" co dang duoc ban (isAvailable = true) hay khong.
 */
const accessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);
console.log("\n--- Cau 6: Tat ca Accessories co dang duoc ban khong? ---");
console.log(accessoriesAvailable ? "Dung" : "Khong");

/**
 * Cau 7: Tinh tong gia tri kho hang. Gia tri kho = price * quantity.
 */
const totalWarehouseValue = products.reduce((total, p) => total + (p.price * p.quantity), 0);
console.log("\n--- Cau 7: Tong gia tri kho hang ---");
console.log(totalWarehouseValue.toLocaleString('vi-VN') + " VND");

/**
 * Cau 8: Dung for...of Duyet mang products va in ra: Ten san pham - Danh muc - Trang thai
 */
console.log("\n--- Cau 8: Thong tin san pham (for...of) ---");
for (const p of products) {
    const status = p.isAvailable ? "Dang ban" : "Ngung ban";
    console.log(`${p.name} - ${p.category} - ${status}`);
}

/**
 * Cau 9: Dung for...in de: In ra ten thuoc tinh, In ra gia tri tuong ung.
 * (Thuc hien cho san pham dau tien trong mang de minh hoa)
 */
console.log("\n--- Cau 9: Thuoc tinh va gia tri san pham dau tien (for...in) ---");
const firstProduct = products[0];
for (const key in firstProduct) {
    console.log(`${key}: ${firstProduct[key]}`);
}

/**
 * Cau 10: Lay danh sach ten cac san pham dang ban va con hang.
 * Dieu kien: isAvailable === true AND quantity > 0
 */
const availableAndInStockNames = products
    .filter(p => p.isAvailable && p.quantity > 0)
    .map(p => p.name);
console.log("\n--- Cau 10: Ten cac san pham dang ban va con hang ---");
console.log(availableAndInStockNames);
