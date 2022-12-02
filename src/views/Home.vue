<script setup>
import shaderString from '/days/1/sample.txt?raw'
console.log(shaderString)

</script>

<template>
  <div>
    <div>
      <h1 class="text-aoc-green text-4xl hover:text-aoc-lime">
        [Advent of Code 2022]
      </h1>
    </div>
    <div class="mt-5">
      <div class="grid grid-cols-5 grid-rows-5 rounded-xl max-w-2xl gap-2">
        <a
          v-for="(a) in Array(25).keys()"
          :key="a"
          :href="`day/${a}`"
          class=" text-white border-opacity-50 min-w-fit p-2 aspect-square rounded bg-slate-800
            hover:translate-x-0.5 hover:-translate-y-0.5 drop-shadow
            active:-translate-x-0.5 active:translate-y-0.5" 
        >
          <div class="grid grid-cols-2 grid-rows-2 w-full h-full">
            <div class="text-2xl pl-1">
              {{ ( a + 1) }}
            </div>
            <div class="absolute top-0 right-0 p-2 text-4xl">
              <span class="text-aoc-yellow">*</span><span class="text-aoc-gray">*</span>
            </div>
            <div class="col-span-2 text-md whitespace-normal text-center">
              Calorie Counting
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
