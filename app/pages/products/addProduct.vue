<template>
  <UContainer class="py-10 flex justify-center">
    <UCard class="w-full max-w-md shadow-md border-t-4 border-primary-500">
      <template #header>
        <h3 class="text-xl font-bold text-center text-gray-800 dark:text-white">
          Añadir Nuevo Hardware
        </h3>
      </template>

      <UForm :schema="productSchema" :state="state" class="flex flex-col gap-y-5" @submit="onSubmit">
        
        <UFormGroup label="Nombre del Producto" name="name">
          <UInput v-model="state.name" placeholder="Ej. MSI Optix G24" size="lg" />
        </UFormGroup>

        <UFormGroup label="Categoría" name="categoryName" help="Escribe: Procesador, Gráfica, Placa Base, RAM o Monitor">
          <UInput v-model="state.categoryName" placeholder="Ej. Monitor" size="lg" icon="i-heroicons-tag" />
        </UFormGroup>

        <UFormGroup label="Descripción" name="description">
          <UTextarea v-model="state.description" placeholder="Detalles técnicos..." size="lg" />
        </UFormGroup>

        <UFormGroup label="Precio de venta" name="price">
          <UInput 
            v-model.number="state.price" 
            type="number" 
            step="0.01" 
            size="lg" 
            icon="i-heroicons-banknotes" 
          />
        </UFormGroup>

        <UFormGroup label="URL de la Imagen" name="image">
          <UInput v-model="state.image" placeholder="https://..." size="lg" icon="i-heroicons-photo" />
        </UFormGroup>

        <div class="flex flex-col gap-3 pt-4">
          <UButton type="submit" :loading="loading" block size="lg" class="font-bold">
            Guardar Producto
          </UButton>
          <UButton color="gray" variant="ghost" block @click="router.back()">
            Cancelar
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from "zod";

const router = useRouter();
const loading = ref(false);
const toast = useToast();

// 1. Esquema de validación (Sin stock)
const productSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  categoryName: z.string().min(2, "Escribe una categoría"),
  description: z.string().min(10, "Descripción demasiado corta"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  image: z.string().url("URL no válida").or(z.literal("")),
});

// 2. Estado inicial
const state = reactive({
  name: "",
  categoryName: "",
  description: "",
  price: 0,
  image: "",
});

// 3. Lógica de envío
async function onSubmit() {
  loading.value = true;
  
  const categoryMap: Record<string, number> = {
    "procesador": 1,
    "tarjeta gráfica": 2,
    "gráfica": 2,
    "placa base": 3,
    "memoria ram": 4,
    "ram": 4,
    "monitor": 5
  };

  const typeId = categoryMap[state.categoryName.toLowerCase().trim()];

  if (!typeId) {
    toast.add({ 
      title: "Categoría no reconocida", 
      description: "Prueba con: Procesador, Gráfica, Placa Base, RAM o Monitor",
      color: "orange" 
    });
    loading.value = false;
    return;
  }

  try {
    await $fetch("/api/products", {
      method: "POST",
      body: {
        name: state.name,
        description: state.description,
        price: Number(state.price), // Aseguramos que sea número
        image: state.image || null,
        type_id: typeId 
      },
    });

    toast.add({ title: "¡Producto guardado!", color: "green", icon: "i-heroicons-check-circle" });
    router.push("/products");
  } catch (err: any) {
    toast.add({ 
      title: "Error de servidor", 
      description: err.data?.message || "Revisa la consola del servidor",
      color: "red" 
    });
  } finally {
    loading.value = false;
  }
}
</script>