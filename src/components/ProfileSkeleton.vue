<template>
  <div class="glass rounded-2xl p-6 animate-pulse">
    <div class="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      <!-- Avatar skeleton -->
      <div class="w-24 h-24 rounded-2xl bg-black/[0.06] shrink-0"></div>

      <div class="flex-1 w-full space-y-3">
        <!-- Name -->
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="h-6 w-40 bg-black/[0.06] rounded-lg"></div>
          <div class="h-4 w-24 bg-black/[0.04] rounded-lg"></div>
        </div>

        <!-- Bio -->
        <div class="space-y-2">
          <div class="h-3.5 w-full max-w-sm bg-black/[0.05] rounded-lg"></div>
          <div class="h-3.5 w-3/4 max-w-xs bg-black/[0.04] rounded-lg"></div>
        </div>

        <!-- Meta -->
        <div class="flex gap-4">
          <div class="h-3.5 w-20 bg-black/[0.04] rounded-lg"></div>
          <div class="h-3.5 w-16 bg-black/[0.04] rounded-lg"></div>
        </div>

        <!-- Stats -->
        <div class="flex gap-5 pt-1">
          <div class="space-y-1.5">
            <div class="h-5 w-10 bg-black/[0.06] rounded-lg mx-auto"></div>
            <div class="h-3 w-10 bg-black/[0.04] rounded-lg"></div>
          </div>
          <div class="space-y-1.5">
            <div class="h-5 w-10 bg-black/[0.06] rounded-lg mx-auto"></div>
            <div class="h-3 w-12 bg-black/[0.04] rounded-lg"></div>
          </div>
          <div class="space-y-1.5">
            <div class="h-5 w-10 bg-black/[0.06] rounded-lg mx-auto"></div>
            <div class="h-3 w-12 bg-black/[0.04] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
