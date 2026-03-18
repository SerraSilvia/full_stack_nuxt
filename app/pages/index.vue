<template>
  <div class="bg-white dark:bg-gray-900">
    <section class="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left flex flex-col justify-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span class="block">Potencia tu Setup al</span>
              <span class="block text-primary-500">Siguiente Nivel</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Encuentra los mejores componentes para tu PC: desde las últimas GPUs de NVIDIA hasta procesadores de alto rendimiento. Calidad garantizada para gamers y profesionales.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <UButton to="/products" size="xl" icon="i-heroicons-shopping-cart">
                Explorar Catálogo
              </UButton>
              <UButton to="/login" variant="ghost" size="xl" color="gray">
                Únete a la comunidad
              </UButton>
            </div>
          </div>
          
          <div class="relative mt-12 lg:col-span-6 lg:mt-0 flex items-center">
            <div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
               <img 
                class="w-full transform hover:scale-105 transition-transform duration-500" 
                src="https://i.pinimg.com/originals/ca/65/b5/ca65b5cbf3a925fe82addaca54a3aa4e.jpg" 
                alt="PC Gaming High End"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-gray-50 dark:bg-gray-800/50 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-white mb-10">Categorías Destacadas</h2>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <UCard v-for="cat in quickCategories" :key="cat.name" class="text-center hover:ring-2 hover:ring-primary-500 cursor-pointer transition-all">
            <div class="flex flex-col items-center gap-2">
              <UIcon :name="cat.icon" class="w-8 h-8 text-primary-500" />
              <span class="text-sm font-semibold">{{ cat.name }}</span>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          <div v-for="feature in features" :key="feature.title" class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
            <div class="md:flex-shrink-0 flex justify-center">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600">
                <UIcon :name="feature.icon" class="h-8 w-8" />
              </div>
            </div>
            <div class="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ feature.title }}</h3>
              <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-primary-600">
      <div class="mx-auto max-w-7xl py-4 px-4 flex items-center justify-between sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">¿Dudas con la compatibilidad?</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-primary-100">
          Nuestro equipo de expertos te asesora para que elijas la fuente o placa base perfecta para tu procesador.
        </p>
        <UButton to="/products" color="white" variant="solid" size="xl" class="mt-8 font-bold text-primary-600">
          Ver todos los componentes
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const quickCategories = [
  { name: 'GPUs', icon: 'i-heroicons-cpu-chip' },
  { name: 'CPUs', icon: 'i-heroicons-bolt' },
  { name: 'RAM', icon: 'i-heroicons-square-3-stack-3d' },
  { name: 'Discos', icon: 'i-heroicons-server' },
  { name: 'Placas', icon: 'i-heroicons-rectangle-group' },
  { name: 'Fuentes', icon: 'i-heroicons-variable' },
];

const features = [
  {
    title: 'Envío en 24h',
    description: 'Sabemos que no puedes esperar a montar tu PC. Entregas ultra rápidas.',
    icon: 'i-heroicons-truck'
  },
  {
    title: 'Garantía Total',
    description: '3 años de garantía en todos tus componentes contra cualquier defecto.',
    icon: 'i-heroicons-shield-check'
  },
  {
    title: 'Soporte Técnico',
    description: '¿No arranca? Te ayudamos paso a paso en el montaje de tu equipo.',
    icon: 'i-heroicons-wrench-screwdriver'
  }
];
</script>