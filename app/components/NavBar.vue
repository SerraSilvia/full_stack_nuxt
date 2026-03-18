<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();
</script>
<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <!-- Links de la izquierda (Navegación principal) -->
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="text-xl font-bold text-gray-900 dark:text-white">
            PC-Shop
          </NuxtLink>
          <UButton variant="link" to="/products" color="gray">
            Productos
          </UButton>
        </div>

        <!-- Links de la derecha (Sesión de usuario) -->
        <div class="flex items-center gap-4">
          <!-- Si el usuario está logueado -->
          <div v-if="loggedIn" class="flex items-center gap-4">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200">Hola, {{ user?.name || user?.login }}</span>
            
            <!-- Enlace a Mis Pedidos -->
            <UButton variant="ghost" to="/orders">
              Mis Pedidos
            </UButton>

            <UButton
              @click="
                clear();
                navigateTo('/login');
              "
              color="gray"
            >
              Logout
            </UButton>
          </div>
          
          <!-- Si el usuario NO está logueado -->
          <div v-else>
            <UButton to="/login">
              Login
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>