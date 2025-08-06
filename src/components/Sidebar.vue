<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="#" class="nav-link"
            ><font-awesome-icon
              icon="fa-solid fa-clipboard-question"
              class="nav-icon"
            />
            <span>질문&답변</span>
          </router-link>
        </li>
        <li>
          <router-link to="#" class="nav-link"
            ><font-awesome-icon
              icon="fa-solid fa-clipboard-list"
              class="nav-icon"
            />
            <span>내활동</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 20px;
  margin: 0 auto;
  height: 70vh;
  border: 1px solid #aea6a6;
  border-radius: 8px;
}

nav {
  padding: 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
  line-height: 62px;
}

.nav-link {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  padding: 0 16px;
  color: #a2a2a2;
}

.nav-icon {
  width: 13px;
  height: 18px;
  flex-shrink: 0;
}

span {
  flex-grow: 1;
  text-align: center;
}

.is-active {
  color: #8b5cf6;
}
.is-active .nav-icon {
  color: #8b5cf6;
}
</style>
