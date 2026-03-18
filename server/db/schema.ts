import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  login: text("login"),
  password: text("password"),
});

/* Tabla para los tipos de productos */
export const product_types = sqliteTable("product_types", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

/* Tabla para los productos */
export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  type_id: integer("type_id").references(() => product_types.id),
  price: real("price").notNull(),
  image: text("image"),
  description: text("description"),
});

/* Tabla para los estados de los pedidos */
export const order_statuses = sqliteTable("order_statuses", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

/* Tabla para los pedidos */
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  order_date: integer("order_date", { mode: 'timestamp' }).notNull(),
  status_id: integer("status_id").references(() => order_statuses.id),
});

/* Tabla para los artículos de un pedido (carrito) */
export const order_items = sqliteTable("order_items", {
  id: integer("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id),
  product_id: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
});

// Definición de relaciones
export const productRelations = relations(products, ({ one }) => ({
  type: one(product_types, {
    fields: [products.type_id],
    references: [product_types.id],
  }),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  // Un pedido pertenece a un usuario
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  // Un pedido tiene un estado
  status: one(order_statuses, {
    fields: [orders.status_id],
    references: [order_statuses.id],
  }),
  // Un pedido tiene muchos artículos
  items: many(order_items),
}));

export const orderItemRelations = relations(order_items, ({ one }) => ({
  // Un artículo pertenece a un pedido
  order: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),
  // Un artículo referencia a un producto
  product: one(products, {
    fields: [order_items.product_id],
    references: [products.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  // Un usuario puede tener muchos pedidos
  orders: many(orders),
}));