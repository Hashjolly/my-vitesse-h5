<template>
  <main class="flex flex-col h-screen text-center">
    <TopAppBar class="nav fixed w-full z-10 shadow shadow-md shadow-warmgray shadow-op-100" />
    <div class="flex flex-col flex-grow z-0 pt-15">
      <Filters />
      <RouterView />
    </div>
    <div class="nav z-10 fixed bottom-0 left-0 w-full border-t-1 border-gray-700 dark:border-gray-200 z-10 bottom-nav-bar-shadow">
      <BottomNavBar />
    </div>
  </main>
</template>
