<template>
  <div>
    <h2 class="page-title">تقديم طلب تصريح جديد</h2>

    <div class="card">
      <form @submit.prevent="handleSubmit">
        <div v-if="successMessage" class="success">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="error">
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label for="applicant_name">الاسم الكامل *</label>
          <input
            id="applicant_name"
            v-model="formData.applicant_name"
            type="text"
            placeholder="أدخل الاسم الكامل"
            :class="{ 'border-red-500': errors.applicant_name }"
            @blur="validateField('applicant_name')"
          />
          <p v-if="errors.applicant_name" class="text-red-600 text-sm mt-1">
            {{ errors.applicant_name }}
          </p>
        </div>

        <div class="form-group">
          <label for="applicant_email">البريد الإلكتروني *</label>
          <input
            id="applicant_email"
            v-model="formData.applicant_email"
            type="email"
            placeholder="example@domain.com"
            :class="{ 'border-red-500': errors.applicant_email }"
            @blur="validateField('applicant_email')"
          />
          <p v-if="errors.applicant_email" class="text-red-600 text-sm mt-1">
            {{ errors.applicant_email }}
          </p>
        </div>

        <div class="form-group">
          <label for="permit_type">نوع التصريح *</label>
          <select
            id="permit_type"
            v-model="formData.permit_type"
            :class="{ 'border-red-500': errors.permit_type }"
            @blur="validateField('permit_type')"
          >
            <option value="" disabled>اختر نوع التصريح</option>
            <option value="تصريح بناء">تصريح بناء</option>
            <option value="تصريح تجاري">تصريح تجاري</option>
            <option value="تصريح مهني">تصريح مهني</option>
            <option value="تصريح فعالية">تصريح فعالية</option>
            <option value="تصريح آخر">تصريح آخر</option>
          </select>
          <p v-if="errors.permit_type" class="text-red-600 text-sm mt-1">
            {{ errors.permit_type }}
          </p>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'جاري الإرسال...' : 'تقديم الطلب' }}
          </button>
          <NuxtLink to="/" class="btn btn-secondary">
            إلغاء
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod';

const permitApplicationSchema = z.object({
  applicant_name: z
    .string()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(100, 'الاسم يجب ألا يزيد عن 100 حرف')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'الاسم يجب أن يحتوي على أحرف فقط'),
  applicant_email: z
    .string()
    .email('البريد الإلكتروني غير صالح')
    .min(1, 'البريد الإلكتروني مطلوب'),
  permit_type: z
    .string()
    .min(1, 'نوع التصريح مطلوب'),
});

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
    permitApplicationSchema.shape[field].parse(formData.value[field]);
    errors.value[field] = '';
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value[field] = error.errors[0].message;
    }
  }
};

const validateForm = () => {
  try {
    permitApplicationSchema.parse(formData.value);
    errors.value = {
      applicant_name: '',
      applicant_email: '',
      permit_type: '',
    };
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message;
      });
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
