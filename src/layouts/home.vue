<template>
  <main class="p-4 text-center">
    <NavMenu />
    <div class="pb-20">
      <RouterView />
      <div class="mt-5 mx-auto text-center opacity-75">
        [Home Layout]
      </div>
    </div>
    <div class="bg-white fixed bottom-0 left-0 w-full border-t-1 border-gray-700 dark:border-gray-200">
      <BottomNavBar />
    </div>
  </main>
</template>
