<template>
  <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
      Mis Pedidos
    </h1>

    <div v-if="pending" class="text-center">Cargando pedidos...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Error al cargar tus pedidos: {{ error.message }}
    </div>
    
    <div v-else-if="!orders || orders.length === 0" class="text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12">
      <p class="text-lg font-medium text-gray-900 dark:text-white">Aún no tienes pedidos.</p>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Explora nuestro catálogo y empieza a comprar.
      </p>
      <UButton to="/products" class="mt-6">
        Ver Productos
      </UButton>
    </div>

    <!-- Lista de pedidos -->
    <div v-else class="space-y-8">
      <UCard v-for="order in orders" :key="order.id">
        <template #header>
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Pedido #{{ order.id }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Realizado el: {{ new Date(order.order_date).toLocaleDateString() }}
              </p>
            </div>
            <UBadge :label="order.status.name" :color="order.status.name === 'Pendiente' ? 'orange' : 'primary'" variant="subtle" />
          </div>
        </template>

        <!-- Artículos del pedido -->
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="item in order.items" :key="item.id" class="py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-300">{{ item.product.name }} (x{{ item.quantity }})</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ (item.product.price * item.quantity).toFixed(2) }} €</span>
          </li>
        </ul>

        <template #footer>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">{{ calculateTotal(order.items) }} €</p>
            </div>
            
            <!-- Botones de acción solo para pedidos pendientes -->
            <div v-if="order.status.name === 'Pendiente'" class="flex items-center gap-2">
              <UButton 
                @click="cancelOrder(order.id)" 
                :loading="loadingStates[order.id]?.cancel"
                color="red" 
                variant="outline"
              >
                Cancelar
              </UButton>
              <UButton 
                @click="purchaseOrder(order.id)"
                :loading="loadingStates[order.id]?.purchase"
              >
                Comprar
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';
import type { order_items, products } from '~/server/db/schema';

// Middleware de autenticación
definePageMeta({
  middleware: 'auth'
});

const toast = useToast();

// Obtenemos los pedidos y la función para refrescar la lista
const { data: orders, pending, error, refresh } = await useFetch('/api/orders', {
  lazy: true,
});

// Estado de carga para cada botón de cada pedido
const loadingStates = ref<{ [key: number]: { purchase?: boolean; cancel?: boolean } }>({});

// Función para calcular el total de un pedido
const calculateTotal = (items: ({ product: typeof products } & typeof order_items)[]) => {
  if (!items) return '0.00';
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
};

// Función para "Comprar" (actualiza el estado a "Procesando")
async function purchaseOrder(orderId: number) {
  setLoading(orderId, 'purchase', true);
  try {
    await $fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: { statusName: 'Procesando' },
    });
    toast.add({ title: '¡Compra realizada!', description: 'Tu pedido se está procesando.', color: 'green' });
    await refresh(); // Recargamos la lista de pedidos
  } catch (e) {
    const err = e as FetchError;
    toast.add({ title: 'Error', description: err.data?.message || 'No se pudo procesar la compra.', color: 'red' });
  } finally {
    setLoading(orderId, 'purchase', false);
  }
}

// Función para "Cancelar" (elimina el pedido)
async function cancelOrder(orderId: number) {
  if (!confirm('¿Estás seguro de que quieres cancelar este pedido?')) return;
  
  setLoading(orderId, 'cancel', true);
  try {
    await $fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
    });
    toast.add({ title: 'Pedido cancelado', description: 'Tu pedido ha sido eliminado.', color: 'amber' });
    await refresh(); // Recargamos la lista de pedidos
  } catch (e) {
    const err = e as FetchError;
    toast.add({ title: 'Error', description: err.data?.message || 'No se pudo cancelar el pedido.', color: 'red' });
  } finally {
    setLoading(orderId, 'cancel', false);
  }
}

// Helper para gestionar los estados de carga
function setLoading(orderId: number, action: 'purchase' | 'cancel', value: boolean) {
  if (!loadingStates.value[orderId]) {
    loadingStates.value[orderId] = {};
  }
  loadingStates.value[orderId][action] = value;
}
</script>