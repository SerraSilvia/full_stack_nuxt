<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nuestro Catálogo</h2>

      <!-- Muestra un mensaje de carga mientras se obtienen los datos -->
      <div v-if="pending" class="mt-6">Cargando productos...</div>
      
      <!-- Muestra un error si la petición falla -->
      <div v-else-if="error" class="mt-6 text-red-500">Error al cargar los productos: {{ error.message }}</div>

      <!-- Renderiza la cuadrícula de productos cuando los datos están listos -->
      <div v-else class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Usamos useFetch para obtener los datos de nuestra API de forma universal (servidor y cliente)
const { data: products, pending, error } = await useFetch('/api/products', {
  lazy: true, // Carga los datos de forma no bloqueante en la navegación del lado del cliente
});
</script>