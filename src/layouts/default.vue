<template>
  <main class="p-4 text-center">
    <NavMenu />
    <RouterView />
    <div class="mt-5 mx-auto text-center opacity-75">
      [Default Layout]
    </div>
    <div class="fixed bottom-0 left-0 w-full">
      <BottomNavBar />
    </div>
  </main>
</template>
