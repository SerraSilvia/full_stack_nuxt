<template>
  <div class="bg-white dark:bg-gray-900 py-12">
    <div v-if="pending">Cargando...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error.message }}</div>
    <div v-else-if="product" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Botón para volver atrás -->
      <div class="mb-8">
        <button @click="goBack" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold">
          &larr; Volver al catálogo
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img :src="product.image || 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'" :alt="product.name" class="w-full rounded-lg shadow-lg">
        </div>
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ product.name }}</h1>
          <p class="text-lg mt-2 text-gray-500 dark:text-gray-400">{{ product.type.name }}</p>
          <p class="text-3xl my-4 text-gray-900 dark:text-white">{{ product.price }} €</p>
          <p class="text-base text-gray-700 dark:text-gray-300">{{ product.description }}</p>
          
          <div class="mt-8">
           <UButton @click="addToCart" :loading="isAdding" block size="xl">
              Añadir al carrito
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { loggedIn } = useUserSession(); // Para saber si el usuario está logueado

const productId = Number(route.params.id);
const isAdding = ref(false); // Estado de carga para el botón

const { data: product, pending, error } = await useFetch(`/api/products/${productId}`, {
  lazy: true
});

const goBack = () => {
  router.back();
};

// --- NUEVA FUNCIÓN ---
async function addToCart() {
  // Si el usuario no está logueado, redirigir al login
  if (!loggedIn.value) {
    toast.add({
      title: 'Inicia sesión',
      description: 'Debes iniciar sesión para añadir productos al carrito.',
      color: 'orange',
      icon: 'i-heroicons-exclamation-triangle',
    });
    return router.push(`/login?redirect=/products/${productId}`);
  }

  isAdding.value = true;
  try {
    await $fetch('/api/orders', {
      method: 'POST',
      body: {
        productId: productId,
        quantity: 1, // Añadimos 1 unidad por defecto
      },
    });

    toast.add({
      title: '¡Añadido!',
      description: `${product.value.name} se ha añadido a tu carrito.`,
      color: 'green',
      icon: 'i-heroicons-check-circle',
    });

  } catch (e) {
    const error = e as FetchError;
    toast.add({
      title: 'Error',
      description: error.data?.message || 'No se pudo añadir el producto al carrito.',
      color: 'red',
      icon: 'i-heroicons-x-circle',
    });
  } finally {
    isAdding.value = false;
  }
}
</script>