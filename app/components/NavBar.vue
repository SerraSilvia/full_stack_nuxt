<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

// Definimos quién es el admin para reutilizar la lógica fácilmente
const isAdmin = computed(() => user.value?.email === "admin@mail.com");

async function handleLogout() {
  await clear();
  await navigateTo("/login");
}
</script>

<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <div class="flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            <UIcon
              name="i-heroicons-computer-desktop"
              class="text-primary-500"
            />
            PC-Shop
          </NuxtLink>

          <UButton
            variant="link"
            to="/products"
            color="gray"
            class="hidden sm:flex"
          >
            Productos
          </UButton>
        </div>

        <div class="flex items-center gap-4">
          <template v-if="loggedIn">
            <UButton
              v-if="isAdmin"
              to="/products/addProduct"
              icon="i-heroicons-plus-circle"
              color="primary"
              variant="soft"
            >
              Nuevo Producto
            </UButton>

            <div class="flex flex-col items-end hidden md:flex">
              <span class="text-xs font-bold text-gray-900 dark:text-white">
                {{ user?.name || user?.login }}
              </span>
              <UBadge v-if="isAdmin" size="xs" variant="subtle" color="primary"
                >Admin</UBadge
              >
            </div>

            <UButton
              variant="ghost"
              to="/orders"
              icon="i-heroicons-shopping-bag"
              color="gray"
            >
              Mis Pedidos
            </UButton>

            <UButton
              @click="handleLogout"
              color="gray"
              variant="ghost"
              icon="i-heroicons-arrow-right-on-rectangle"
            >
              Logout
            </UButton>
          </template>

          <template v-else>
            <UButton to="/login" icon="i-heroicons-user-circle">
              Iniciar Sesión
            </UButton>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
