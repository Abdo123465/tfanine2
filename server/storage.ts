import { users, orders, products, type User, type InsertUser, type Order, type InsertOrder, type Product, type InsertProduct } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrders(): Promise<Order[]>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<string, Order>;
  private products: Map<string, Product>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.products = new Map();
    this.currentId = 1;
    
    // Initialize with some sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [];
    
    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = { 
      ...insertOrder, 
      createdAt: new Date(),
      status: insertOrder.status || "pending",
    };
    this.orders.set(order.id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = { 
      ...insertProduct,
      description: insertProduct.description || null,
      image: insertProduct.image || null,
      subcategory: insertProduct.subcategory || null,
      brand: insertProduct.brand || null,
      featured: insertProduct.featured || false,
      newProduct: insertProduct.newProduct || false,
      bestSeller: insertProduct.bestSeller || false,
      inStock: insertProduct.inStock || true,
    };
    this.products.set(product.id, product);
    return product;
  }
}

export const storage = new MemStorage();
