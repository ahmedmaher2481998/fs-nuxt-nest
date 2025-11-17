<template>
  <div class="min-h-screen bg-background">
    <header class="bg-primary text-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            نظام طلبات التصاريح
          </h1>
          <nav class="flex gap-3">
            <NuxtLink
              to="/"
              exact-active-class="bg-white/20 font-semibold"
              class="px-4 py-2 rounded-lg transition-all hover:bg-white/10 duration-200"
            >
              الرئيسية
            </NuxtLink>
            <NuxtLink
              to="/apply"
              active-class="bg-white/20 font-semibold"
              class="px-4 py-2 rounded-lg transition-all hover:bg-white/10 duration-200"
            >
              تقديم طلب
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-6 py-8">
      <NuxtPage />
    </main>
    <footer class="bg-primary text-white mt-auto py-6">
      <div class="container mx-auto px-6 text-center">
        <p class="text-sm opacity-90">© 2024 نظام طلبات التصاريح - جميع الحقوق محفوظة</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
