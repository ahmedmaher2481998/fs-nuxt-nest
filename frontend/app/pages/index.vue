<template>
  <div>
    <h2 class="page-title">طلبات التصاريح</h2>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="pending" class="loading">
      جاري تحميل الطلبات...
    </div>

    <div v-else-if="!applications || applications.length === 0" class="empty-state">
      <p>لا توجد طلبات تصاريح حالياً</p>
      <NuxtLink to="/apply" class="btn btn-primary" style="margin-top: 1rem;">
        تقديم طلب جديد
      </NuxtLink>
    </div>

    <div v-else class="applications-grid">
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
