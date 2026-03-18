<template>
  <UContainer class="py-10">
    <UCard>
      <template #header>
        <h3 class="text-xl font-bold">Gestionar Producto</h3>
      </template>

      <UForm
        :schema="productSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Nombre del Producto" name="name">
          <UInput v-model="state.name" placeholder="Ej. Camiseta Algodón" />
        </UFormGroup>

        <UFormGroup label="Descripción" name="description">
          <UTextarea
            v-model="state.description"
            placeholder="Detalles del producto..."
          />
        </UFormGroup>

        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="Precio (€)" name="price">
            <UInput
              v-model.number="state.price"
              type="number"
              step="0.01"
              icon="i-heroicons-banknotes"
            />
          </UFormGroup>

          <UFormGroup label="Stock" name="stock">
            <UInput v-model.number="state.stock" type="number" />
          </UFormGroup>
        </div>

        <UFormGroup label="URL de la Imagen" name="image">
          <UInput v-model="state.image" placeholder="https://..." />
        </UFormGroup>

        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="ghost" @click="useRouter().back()">
            Cancelar
          </UButton>
          <UButton type="submit" :loading="loading"> Guardar Producto </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const toast = useToast();
const loading = ref(false);

// 1. Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción es muy corta"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  image: z.string().url("Introduce una URL de imagen válida").or(z.literal("")),
});

// Extraemos el tipo de TypeScript del esquema
type Schema = z.output<typeof productSchema>;

// 2. Estado inicial del formulario
const state = reactive<Schema>({
  name: "", // Inicializa con strings vacíos en lugar de undefined
  description: "",
  price: 0,
  stock: 0,
  image: "",
});

// 3. Función de envío
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;

  try {
    console.log("Datos validados:", event.data);
    await $fetch("/api/products", {
      method: "POST",
      body: event.data,
    });

    toast.add({
      title: "Éxito",
      description: "Producto guardado correctamente",
      color: "green",
    });

    useRouter().push("/");
  } catch (err: any) {
    toast.add({
      title: "Error",
      description: err.data?.message || "Error al guardar",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
}
</script>
