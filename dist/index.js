import express from "express";
const app = express();
const PORT = 3000;
// ================= MIDDLEWARE =================
app.use(express.json());
// ================= DATA =================
let nextId = 1;
let products = [
    { id: nextId++, name: "Iphone 17", price: 2000, category: "Phone" },
    { id: nextId++, name: "Samsung Galaxy S24", price: 1800, category: "Phone" },
    { id: nextId++, name: "Xiaomi Mi 14", price: 1200, category: "Phone" },
    { id: nextId++, name: "Google Pixel 9", price: 1500, category: "Phone" },
    { id: nextId++, name: "MacBook Pro M3", price: 3200, category: "Laptop" },
    { id: nextId++, name: "MacBook Air M2", price: 2200, category: "Laptop" },
    { id: nextId++, name: "Dell XPS 15", price: 2500, category: "Laptop" },
    { id: nextId++, name: "Asus ROG Strix", price: 2800, category: "Laptop" },
    { id: nextId++, name: "iPad Pro 13", price: 1900, category: "Tablet" },
    {
        id: nextId++,
        name: "Samsung Galaxy Tab S9",
        price: 1400,
        category: "Tablet",
    },
    {
        id: nextId++,
        name: "Apple Watch Ultra",
        price: 1100,
        category: "Wearable",
    },
    {
        id: nextId++,
        name: "Samsung Galaxy Watch 6",
        price: 900,
        category: "Wearable",
    },
    { id: nextId++, name: "AirPods Pro 2", price: 600, category: "Accessory" },
    { id: nextId++, name: "Sony WH-1000XM5", price: 700, category: "Accessory" },
    {
        id: nextId++,
        name: "Logitech MX Master 3S",
        price: 400,
        category: "Accessory",
    },
];
// ================= ROUTES =================
app.get("/products", (req, res) => {
    const { search, page = "1", limit = "10" } = req.query;
    let result = [...products];
    // ===== SEARCH =====
    if (typeof search === "string" && search.trim() !== "") {
        const keyword = search.toLowerCase();
        result = result.filter((p) => p.name.toLowerCase().includes(keyword));
    }
    // ===== PAGINATION =====
    const p = Number(page);
    const l = Number(limit);
    const start = (p - 1) * l;
    res.status(200).json({
        total: result.length,
        page: p,
        limit: l,
        data: result.slice(start, start + l),
    });
});
// GET /products/:id
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    res.status(200).json(product);
});
// POST /products
app.post("/products", (req, res) => {
    const { name, price, category } = req.body;
    // ===== VALIDATE =====
    if (!name || typeof name !== "string" || name.length < 5) {
        res.status(400).json({ message: "Tên phải có ít nhất 5 ký tự" });
        return;
    }
    if (typeof price !== "number" || price <= 0) {
        res.status(400).json({ message: "Giá phải là số dương" });
        return;
    }
    const newProduct = {
        id: nextId++,
        name,
        price,
        category,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// PUT /products/:id
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    const { name, price } = req.body;
    if (name !== undefined) {
        if (typeof name !== "string" || name.length < 5) {
            res.status(400).json({ message: "Tên không hợp lệ" });
            return;
        }
        product.name = name;
    }
    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            res.status(400).json({ message: "Giá không hợp lệ" });
            return;
        }
        product.price = price;
    }
    res.status(200).json(product);
});
// DELETE /products/:id
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    products.splice(index, 1);
    res.status(200).json({ message: "Deleted successfully" });
});
// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map