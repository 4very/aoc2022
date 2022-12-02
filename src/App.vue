<script setup>

const bumps = [
  {
    before: '0.0.0.0:',
    after: '',
  },
  {
    before: 'y(',
    after: ')',
  },
  {
    before: '0x0000 | ',
    after: '',
  },
  {
    before: 'var y = ',
    after: ';',
  },
  {
    before: 'int y = ',
    after: ';',
  },
  {
    before: '//',
    after: '',
  },
  {
    before: '{year=>',
    after: '}',
  },
  {
    before: '<y>',
    after: '</y>',
  },
  {
    before: '/*',
    after: '*/',
  },
  {
    before: '0xffff&',
    after: '',
  },
  {
    before: '$year=',
    after: ';',
  },
  {
    before: 'sub y {',
    after: '}',
  },
  {
    before: '',
    after: '',
  },
  {
    before: '/^',
    after: '$/',
  },
  {
    before: '{\'year\':',
    after: '}',
  },
  {
    before: 'λy.',
    after: '',
  },
  {
    before: '$year=',
    after: ';',
  },
]

const choice = bumps[Math.floor(Math.random()*1000%bumps.length)]

</script>


<template>
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="mx-auto my-6">
      <div class="mb-5 text-[#00cc00] flex flex-col w-fit">
        <a
          class="text-3xl hover:text-aoc-lime glow-green w-fit"
          href="/"
        >
          Advent of Code
        </a>
        <a class="text-2xl hover:text-aoc-lime w-fit float-right ml-auto glow-green">
          <span class="opacity-30">{{ choice.before }}</span>2022<span class="opacity-30">{{ choice.after }}</span>
        </a>
      </div>
      <router-view />
    </div>
  </div>
</template>
