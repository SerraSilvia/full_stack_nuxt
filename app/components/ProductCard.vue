<template>
  <div class="group relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img :src="product.image || 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'" :alt="product.name" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
    </div>
    <div class="p-4 flex flex-col">
      <div>
        <h3 class="text-sm text-gray-700 dark:text-gray-200">
          <NuxtLink :to="`/products/${product.id}`">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ product.name }}
          </NuxtLink>
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ product.type.name }}</p>
      </div>
      <p class="text-lg font-medium text-gray-900 dark:text-white mt-2">{{ product.price }} €</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>