<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1>نظام طلبات التصاريح</h1>
          <nav class="nav">
            <NuxtLink to="/" exact-active-class="active">الرئيسية</NuxtLink>
            <NuxtLink to="/apply" active-class="active">تقديم طلب</NuxtLink>
          </nav>
        </div>
      </div>
    </header>
    <main class="main-content">
      <div class="container">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup>
</script>
