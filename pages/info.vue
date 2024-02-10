<template>
    <div class="flex flex-col mx-3 h-dvh relative">
        <div class="flex flex-col sticky top-0 pt-3 bg-white">


            <div class="m-3">
                <div class="m-3 p-2 border rounded-md border-sky-500">
                    <div class="text-2xl text-center font-bold">
                        ข้อมูลผู้ใช้น้ำ
                        <Icon name="mdi:account" class="text-blue-500" />
                    </div>
                    <p><b>ชื่อผู้ใช้น้ำ</b> นายสมชาย แมนมาก</p>
                    <p><b>ที่อยู่</b> 389 ม.3 อ.เมือง จ.พะเยา</p>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="table border border-black rounded-md">
                    <!-- head -->
                    <thead class="text-blue-500 rounded-t-md">
                        <tr class="border border-black">
                            <th class="border border-black rounded-tl-md">เดือน</th>
                            <th class="border border-black">จำนวนการใช้น้ำ (หน่วย)</th>
                            <th class="border border-black rounded-tr-md">ยอดชำระ (บาท)</th>
                        </tr>
                    </thead>
                    <tbody class="rounded-b-md">
                        <!-- row 1 -->
                        <tr class="border border-black">
                            <td class="border border-black">มกราคม</td>
                            <td class="border border-black">20</td>
                            <td class="border border-black">140</td>
                        </tr>
                        <!-- row 2 -->
                        <tr class="border border-black">
                            <td class="border border-black">ธันวาคม</td>
                            <td class="border border-black">15</td>
                            <td class="border border-black">105</td>
                        </tr>
                        <!-- row 3 -->
                        <tr class="border border-black">
                            <td class="border border-black">พฤษจิกายน</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 4 -->
                        <tr class="border border-black">
                            <td class="border border-black">ตุลาคม</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 5 -->
                        <tr class="border border-black">
                            <td class="border border-black">กันยายน</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 6 -->
                        <tr class="border border-black">
                            <td class="border border-black">สิงหาคม</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 7 -->
                        <tr class="border border-black">
                            <td class="border border-black">กรกฎาคม</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 8 -->
                        <tr class="border border-black">
                            <td class="border border-black">มิถุนายน</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 9 -->
                        <tr class="border border-black">
                            <td class="border border-black">พฤษภาคม</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 10 -->
                        <tr class="border border-black">
                            <td class="border border-black">เมษายน</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 11 -->
                        <tr class="border border-black">
                            <td class="border border-black">มีนาคม</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>
                        <!-- row 12 -->
                        <tr class="border border-black">
                            <td class="border border-black">กุมภาพันธ์</td>
                            <td class="border border-black">17</td>
                            <td class="border border-black">119</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <button class="btn btn-block mt-3 bg-sky-500 text-white text-xl font-bold" @click="AddBill">เพิ่มบิลการใช้น้ำ
                <icon name="icon-park-outline:bill" />
            </button>


        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {addbillHouseInfo} from '~/services/addbillHouseService.ts'


const houseInfo = ref(null);
const router = useRouter()
const route = useRoute();
const houseName = route.query.houseName;
onMounted(async () => {
  if (houseName) {
    try {
      const response = await addbillHouseInfo(houseName);
      console.log(response.data.data)
      houseInfo.value = response.data.data;
      // Process the data as required
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});
function AddBill(){
    router.push({ path: '/AddBill' })
}

</script>