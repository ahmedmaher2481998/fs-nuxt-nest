<template>
  <div class="min-h-[calc(100vh-12rem)]">
    <h2 class="text-3xl font-bold text-primary mb-8">تقديم طلب تصريح جديد</h2>

    <div class="bg-white rounded-lg shadow-card p-8 max-w-3xl">
      <form @submit.prevent="handleSubmit">
        <div v-if="successMessage"
          class="bg-success/10 border border-success text-success px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ successMessage }}
        </div>

        <div v-if="errorMessage"
          class="bg-danger-light border border-danger-border text-danger-dark px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ errorMessage }}
        </div>

        <div class="mb-6">
          <label for="applicant_name" class="block text-text font-semibold mb-2">الاسم الكامل *</label>
          <input id="applicant_name" v-model="formData.applicant_name" type="text" placeholder="أدخل الاسم الكامل"
            class="w-full px-4 py-3 border rounded-lg font-sans transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            :class="errors.applicant_name ? 'border-danger' : 'border-border'"
            @blur="validateField('applicant_name')" />
          <p v-if="errors.applicant_name" class="text-danger text-sm mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ errors.applicant_name }}
          </p>
        </div>

        <div class="mb-6">
          <label for="applicant_email" class="block text-text font-semibold mb-2">البريد الإلكتروني *</label>
          <input id="applicant_email" v-model="formData.applicant_email" type="email" placeholder="example@domain.com"
            class="w-full px-4 py-3 border rounded-lg font-sans transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            :class="errors.applicant_email ? 'border-danger' : 'border-border'"
            @blur="validateField('applicant_email')" />
          <p v-if="errors.applicant_email" class="text-danger text-sm mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ errors.applicant_email }}
          </p>
        </div>

        <div class="mb-8">
          <label for="permit_type" class="block text-text font-semibold mb-2">نوع التصريح *</label>
          <select id="permit_type" v-model="formData.permit_type"
            class="w-full px-4 py-3 border rounded-lg font-sans transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            :class="errors.permit_type ? 'border-danger' : 'border-border'" @blur="validateField('permit_type')">
            <option value="" disabled>اختر نوع التصريح</option>
            <option v-for="type in permitTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <p v-if="errors.permit_type" class="text-danger text-sm mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ errors.permit_type }}
          </p>
        </div>

        <div class="flex gap-4">
          <button type="submit"
            class="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-btn-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
            :disabled="isSubmitting">
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ isSubmitting ? 'جاري الإرسال...' : 'تقديم الطلب' }}
          </button>
          <NuxtLink to="/"
            class="px-6 py-3 rounded-lg font-semibold bg-secondary border border-border hover:bg-secondary-dark transition-all duration-200 text-text">
            إلغاء
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { PermitApplicationSchema, PERMIT_TYPES } from '@common/types';

const permitTypes = PERMIT_TYPES;

const formData = ref({
  applicant_name: '',
  applicant_email: '',
  permit_type: '',
});

const errors = ref({
  applicant_name: '',
  applicant_email: '',
  permit_type: '',
});

const isSubmitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const validateField = (field) => {
  try {
    PermitApplicationSchema.shape[field].parse(formData.value[field]);
    errors.value[field] = '';
  } catch (error) {
    errors.value[field] = error.errors[0].message;
  }
};

const validateForm = () => {
  try {
    PermitApplicationSchema.parse(formData.value);
    errors.value = {
      applicant_name: '',
      applicant_email: '',
      permit_type: '',
    };
    return true;
  } catch (error) {
    for (const err of error.errors) {
      errors.value[err.path[0]] = err.message;
    }
    return false;
  }
};

const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!validateForm()) {
    errorMessage.value = 'يرجى تصحيح الأخطاء في النموذج';
    return;
  }

  isSubmitting.value = true;

  try {
    // we can also use UseFetch composable here 
    const response = await $fetch('/api/permits', {
      method: 'POST',
      body: formData.value,
    });

    successMessage.value = 'تم تقديم الطلب بنجاح!';

    formData.value = {
      applicant_name: '',
      applicant_email: '',
      permit_type: '',
    };

    errors.value = {
      applicant_name: '',
      applicant_email: '',
      permit_type: '',
    };
    //  go back to home after 2 seconds
    setTimeout(() => {
      navigateTo('/');
    }, 2000);
  } catch (error) {
    errorMessage.value = error.data?.message || 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
