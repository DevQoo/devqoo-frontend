<template>
  <div class="sidebar">
    <nav>
      <ul> 
        <li>
          <router-link to="#">질문&답변</router-link>
        </li>
        <li>
          <router-link to="#">내 활동</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  padding: 20px;
  margin: 0 auto;
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
