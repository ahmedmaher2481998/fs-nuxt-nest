<template>
  <div class="min-h-[calc(100vh-12rem)]">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-primary">طلبات التصاريح</h2>
      <NuxtLink
        to="/apply"
        class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-btn-hover flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        تقديم طلب جديد
      </NuxtLink>
    </div>

    <div v-if="error" class="bg-danger-light border border-danger-border text-danger-dark px-6 py-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else-if="pending" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
      <p class="text-text-muted text-lg">جاري تحميل الطلبات...</p>
    </div>

    <div v-else-if="!applications || applications.length === 0" class="bg-white rounded-lg shadow-card p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="text-text-muted text-lg mb-6">لا توجد طلبات تصاريح حالياً</p>
      <NuxtLink
        to="/apply"
        class="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-btn-hover"
      >
        تقديم طلب جديد
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ApplicationCard v-for="application in applications" :key="application.id" :application="application" />
    </div>
  </div>
</template>

<script setup>
const { data: applications, pending, error, refresh } = await useFetch('/api/permits');

onMounted(() => {
  const interval = setInterval(() => {
    // refresh the data every .5 min 
    refresh();
  }, 30000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
