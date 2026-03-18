// server/db/seed.ts
import { db } from './index';
import { users, product_types, products, order_statuses } from './schema';
import { hash } from 'bcrypt'; // Usaremos bcrypt para hashear la contraseña

async function seed() {
  try {
    console.log("🌱 Empezando el seeder...");

    // 1. Limpiar tablas existentes (opcional, pero recomendado para ejecuciones repetidas)
    console.log("🗑️ Limpiando la base de datos...");
    await db.delete(products);
    await db.delete(product_types);
    await db.delete(order_statuses);
    await db.delete(users);


    // 2. Insertar tipos de producto
    console.log("🏷️ Insertando tipos de producto...");
    const productTypesData = [
      { name: 'Procesador' },
      { name: 'Tarjeta Gráfica' },
      { name: 'Placa Base' },
      { name: 'Memoria RAM' },
    ];
    const insertedProductTypes = await db.insert(product_types).values(productTypesData).returning();
    console.log(`✅ ${insertedProductTypes.length} tipos de producto insertados.`);

    // 3. Insertar estados de pedido
    console.log("📊 Insertando estados de pedido...");
    const orderStatusesData = [
      { name: 'Pendiente' },
      { name: 'Procesando' },
      { name: 'Enviado' },
      { name: 'Entregado' },
      { name: 'Cancelado' },
    ];
    const insertedOrderStatuses = await db.insert(order_statuses).values(orderStatusesData).returning();
    console.log(`✅ ${insertedOrderStatuses.length} estados de pedido insertados.`);

    // 4. Insertar un usuario de prueba
    console.log("👤 Insertando usuario de prueba...");
    const hashedPassword = await hash('12345678', 10);
    const usersData = [{
        name: 'Silvia Serra',
        email: 'silvia.serra@gmail.com',
        login: 'silvia.serra',
        password: hashedPassword,
    }];
    const insertedUsers = await db.insert(users).values(usersData).returning();
    console.log(`✅ ${insertedUsers.length} usuario insertado.`);


    // 5. Insertar productos de hardware
    console.log("💻 Insertando productos...");
    const productsData = [
        { name: 'Intel Core i9-13900K', type_id: insertedProductTypes[0].id, price: 589.99, description: 'Procesador de última generación para gaming y creación de contenido.' },
        { name: 'NVIDIA GeForce RTX 4090', type_id: insertedProductTypes[1].id, price: 1599.99, description: 'La GPU más potente para jugar en 4K con Ray Tracing.' },
        { name: 'ASUS ROG MAXIMUS Z790 HERO', type_id: insertedProductTypes[2].id, price: 699.99, description: 'Placa base de gama alta para procesadores Intel.' },
        { name: 'Corsair Vengeance DDR5 32GB', type_id: insertedProductTypes[3].id, price: 150.50, description: 'Kit de memoria RAM de alta velocidad.' },
        { name: 'AMD Ryzen 9 7950X', type_id: insertedProductTypes[0].id, price: 699.00, description: 'Procesador de 16 núcleos y 32 hilos de AMD.' },
    ];
    const insertedProducts = await db.insert(products).values(productsData).returning();
    console.log(`✅ ${insertedProducts.length} productos insertados.`);


    console.log("🎉 Seeder completado con éxito!");

  } catch (error) {
    console.error("❌ Error durante el seeder:", error);
    process.exit(1);
  }
}

seed();