<template>
  <div class="flex flex-col h-dvh relative ">
    <div class="flex flex-col sticky top-0 pt-3 mx-3 mt-12">
      <VueDatePicker v-model="month" month-picker @closed="selectedDate" />
      <div class="filter-buttons">
        <button v-for="status in paymentStatusOptions" :key="status" :class="{ 'active': paymentStatusFilter === status }"
          @click="setPaymentStatusFilter(status)">
          {{ status }}
        </button>
      </div>

    </div>

    <div class="overflow-y-auto mt-3 h-full">
      <div class="grid gap-2">
        <div v-bind:key="data.house.name" v-for="data in reportFilteredData" :class="[backgroundColor(data.paid)]"
          class="flex-col border-solid border-2 border-gray-300 p-3">
          <div class="text-md font-bold">{{ data.house.owner_name }}</div>
          <div>{{ data.house.meter_id }}</div>
          <span class="align-text-bottom">
            <span>สถานะ</span>
            <span :class="[textColor(data.paid)]" class="ml-1 text-md font-bold">{{ data.paid ? "จ่ายแล้ว" :
              "ค้างชำระ" }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.filter-buttons button {
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}

.filter-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { getPaymentRecordByMonthAndYear } from '../services/paymentRecordService';
import type { paymentRecord } from "~/domains/types/paymentRecord";

const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

const selectedDate = () => {
  loadReportHouse(month.value.month, month.value.year)
};

function backgroundColor(status: boolean) {
  if (status) {
    return "bg-green-100";

  } else {
    return "bg-red-100";
  }
}

function textColor(status: boolean) {
  if (status) {
    return "text-green-500";

  } else {
    return "text-red-500";
  }
}


// const reportData = ref(result.data.value?.message);
const reportData = ref([] as paymentRecord[]);

const loadReportHouse = async (month: number, year: number) => {
  let result = await getPaymentRecordByMonthAndYear(month, year);
  console.log(result)
  reportData.value = result ?? []
};

selectedDate()

// Define the possible states for the filter
const paymentStatusOptions = ['ทั้งหมด', 'เก็บเงินแล้ว', 'ยังไม่ได้ดำเนินการ'];

// Reactive state for the filter
const paymentStatusFilter = ref(paymentStatusOptions[0]);

// Function to set the filter
function setPaymentStatusFilter(status: string) {
  paymentStatusFilter.value = status;
}

// Updated computed property
const reportFilteredData = computed(() => {
  switch (paymentStatusFilter.value) {
    case 'เก็บเงินแล้ว':
      return reportData.value.filter(record => record.paid);
    case 'ยังไม่ได้ดำเนินการ':
      return reportData.value.filter(record => !record.paid);
    default:
      return reportData.value;
  }
});
</script>

