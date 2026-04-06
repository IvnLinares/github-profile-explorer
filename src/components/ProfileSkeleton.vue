<template>
  <div class="bg-surface-2 rounded-2xl border border-white/10 p-6 animate-pulse">
    <div class="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      <!-- Avatar skeleton -->
      <div class="w-28 h-28 rounded-full bg-surface-3"></div>

      <div class="flex-1 w-full space-y-4">
        <!-- Name -->
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="h-7 w-48 bg-surface-3 rounded"></div>
          <div class="h-5 w-28 bg-surface-3 rounded"></div>
        </div>

        <!-- Bio -->
        <div class="space-y-2">
          <div class="h-4 w-full max-w-md bg-surface-3 rounded"></div>
          <div class="h-4 w-3/4 max-w-sm bg-surface-3 rounded"></div>
        </div>

        <!-- Meta -->
        <div class="flex gap-4">
          <div class="h-4 w-24 bg-surface-3 rounded"></div>
          <div class="h-4 w-20 bg-surface-3 rounded"></div>
        </div>

        <!-- Stats -->
        <div class="flex gap-6">
          <div class="text-center space-y-1">
            <div class="h-6 w-10 bg-surface-3 rounded mx-auto"></div>
            <div class="h-3 w-12 bg-surface-3 rounded"></div>
          </div>
          <div class="text-center space-y-1">
            <div class="h-6 w-10 bg-surface-3 rounded mx-auto"></div>
            <div class="h-3 w-14 bg-surface-3 rounded"></div>
          </div>
          <div class="text-center space-y-1">
            <div class="h-6 w-10 bg-surface-3 rounded mx-auto"></div>
            <div class="h-3 w-14 bg-surface-3 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
