<template>
  <div class="auth-layout">
    <main class="auth-layout__main">
      <div class="auth-layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.auth-layout {
  width: 100%;
  max-width: 1920px;
  min-height: 1080px;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
}

.auth-layout__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 1080px; /* 헤더 제거로 전체 높이 사용 */
}

.auth-layout__content {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Large desktop styles for 1920x1080 */
@media (min-width: 1920px) {
  .auth-layout {
    width: 1920px;
    height: 1080px;
  }

  .auth-layout__main {
    min-height: 1080px;
  }
}

/* Responsive Design for smaller screens */
@media (max-width: 1919px) {
  .auth-layout {
    min-height: 100vh;
  }

  .auth-layout__main {
    min-height: 100vh;
  }
}

@media (max-width: 768px) {
  .auth-layout__main {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .auth-layout__main {
    padding: 16px;
  }

  .auth-layout__content {
    max-width: 100%;
  }
}
</style>
