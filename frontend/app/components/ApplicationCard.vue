<template>
  <div class="application-card">
    <h3>{{ application.applicant_name }}</h3>
    <p><strong>البريد الإلكتروني:</strong> {{ application.applicant_email }}</p>
    <p><strong>نوع التصريح:</strong> {{ application.permit_type }}</p>
    <p><strong>تاريخ التقديم:</strong> {{ formatDate(application.submitted_at) }}</p>
    <span :class="getStatusClass(application.application_status)">
      {{ getStatusText(application.application_status) }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  application: {
    type: Object,
    required: true,
  },
});
// format in sa format 
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusClass = (status) => {
  const baseClass = 'status-badge';
  switch (status) {
    case 'Pending':
      return `${baseClass} status-pending`;
    case 'Approved':
      return `${baseClass} status-approved`;
    case 'Rejected':
      return `${baseClass} status-rejected`;
    default:
      return baseClass;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'Pending':
      return 'قيد المراجعة';
    case 'Approved':
      return 'مقبول';
    case 'Rejected':
      return 'مرفوض';
    default:
      return status;
  }
};
</script>
