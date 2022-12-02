<script setup>

import dayData from '/days/meta.js'

const todaysDay = (new Date()).getDate()
const calendarData = []

for(let numberIterator = 1; numberIterator <= 25; numberIterator++) {
  if (numberIterator > todaysDay) {
    calendarData.push({
      avaliable: false,
    })
  } else {
    calendarData.push(dayData[numberIterator])
  }
}
</script>

<template>
  <div>
    <div class="mt-5">
      <div class="grid grid-cols-5 grid-rows-5 rounded-xl max-w-2xl gap-2">
        <a
          v-for="(day, dayNumber) in calendarData"
          :key="dayNumber"
          :href="`day/${dayNumber + 1}`"
          class=" text-white border-opacity-50 min-w-fit p-2 aspect-square rounded bg-slate-800
            hover:translate-x-0.5 hover:-translate-y-0.5 drop-shadow
            active:-translate-x-0.5 active:translate-y-0.5" 
        >
          <div
            v-if="(day?.avaliable !== false)"
            class="grid grid-cols-2 grid-rows-2 w-full h-full"
          >
            <div class="text-2xl pl-1">
              {{ dayNumber + 1 }}
            </div>
            <div class="absolute top-0 right-0 p-2 text-4xl text-aoc-gray">
              <span :class="{'text-aoc-yellow': day?.completion > 0}">*</span>
              <span :class="{'text-aoc-yellow': day?.completion > 1}">*</span>
            </div>
            <div class="col-span-2 text-md whitespace-normal text-center">
              {{ day?.dayTitle ?? '--' }}
            </div>
          </div>
          <div
            v-else
            class="bg-red-200 opacity-10"
          />
        </a>
      </div>
    </div>
  </div>
</template>
