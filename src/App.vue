<script setup lang="ts">
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {menuRoutes} from "@/router/routes";
import {onBeforeUnmount, ref} from "vue";

const router = useRouter();
const route = useRoute();

const isDragging = ref(false);
const eventFired = ref(false);
const offset = ref(0);
const start = ref(0);

function routerLeft()
{
  const routeNames = menuRoutes.map((r) => r.name).filter(Boolean) as string[];
  const currentIndex = routeNames.indexOf(route.name as string);
  if (currentIndex > 0)
  {
    const targetRouteName = routeNames[currentIndex - 1];
    router.push({
      name: targetRouteName
    })
  }
}

function routerRight()
{
  const routeNames = menuRoutes.map((r) => r.name).filter(Boolean) as string[];
  const currentIndex = routeNames.indexOf(route.name as string);
  if (currentIndex < routeNames.length - 1)
  {
    const targetRouteName = routeNames[currentIndex + 1];
    router.push({
      name: targetRouteName
    })
  }
}

function onSwipeLeft(): void
{
  console.log("on swipe left");
  routerRight();
}

function onSwipeRight(): void
{
  console.log("on swipe right");
  routerLeft();
}

function onMouseDown(e: MouseEvent): void
{
  isDragging.value = true;
  eventFired.value = false;
  start.value = e.clientX;
  offset.value = 0;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}
function onMouseMove(e: MouseEvent): void
{
  if (isDragging.value)
  {
    offset.value = e.clientX - start.value;
  }
}
function onMouseUp(): void
{
  let distance = Math.abs(offset.value);
  if (distance > 400)
  {
    let isSwipedLeft = offset.value < 0;

    if (isSwipedLeft)
    {
      onSwipeLeft();
    }
    else
    {
      onSwipeRight();
    }

    eventFired.value = true;
  }

  isDragging.value = false;
  offset.value = 0;

  removeEventListeners();
}

function removeEventListeners()
{
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

onBeforeUnmount(removeEventListeners);
</script>

<template>
  <div class="scrollBox">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <label>isDragging:{{ isDragging }} | eventFired:{{ eventFired }} | offset:{{ offset }}</label>

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/second">Second</RouterLink>
          <RouterLink to="/third">Third</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView
        :style="{ transform: 'translateX(' + offset + 'px)' }"
        @mousedown="onMouseDown"/>
  </div>
</template>

<style scoped>
.scrollBox {
  overflow: hidden;
  background-color: darkgray;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
