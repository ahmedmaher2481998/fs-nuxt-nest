<template>
  <div
    class="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 p-6 border-r-4 hover:-translate-y-1"
    :class="getBorderColor(application.application_status)">
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-xl font-semibold text-primary flex-1">{{ application.applicant_name }}</h3>
      <span :class="getStatusClass(application.application_status)">
        {{ getStatusText(application.application_status) }}
      </span>
    </div>

    <div class="space-y-3">
      <div class="flex items-center gap-2 text-text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="text-sm">{{ application.applicant_email }}</span>
      </div>

      <div class="flex items-center gap-2 text-text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-sm font-medium">{{ application.permit_type }}</span>
      </div>

      <div class="flex items-center gap-2 text-text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-sm">{{ formatDate(application.submitted_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ApplicationStatus, STATUS_LABELS } from '@common/types';

const props = defineProps({
  application: {
    type: Object,
    required: true,
  },
});

// format in sa datwe  format
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
  const baseClass = 'inline-block px-4 py-1.5 rounded-badge text-sm font-semibold';
  switch (status) {
    case ApplicationStatus.PENDING:
      return `${baseClass} bg-status-pending text-status-pending border border-status-pending`;
    case ApplicationStatus.APPROVED:
      return `${baseClass} bg-status-approved text-status-approved border border-status-approved`;
    case ApplicationStatus.REJECTED:
      return `${baseClass} bg-status-rejected text-status-rejected border border-status-rejected`;
    default:
      return baseClass;
  }
};

const getBorderColor = (status) => {
  switch (status) {
    case ApplicationStatus.PENDING:
      return 'border-warning';
    case ApplicationStatus.APPROVED:
      return 'border-success';
    case ApplicationStatus.REJECTED:
      return 'border-danger';
    default:
      return 'border-border';
  }
};

const getStatusText = (status) => {
  return STATUS_LABELS[status] || status;
};
</script>
