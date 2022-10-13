<template>
  <div class="menu-btn open">
    <div class="hamburger-top" ></div>
    <div class="hamburger-mid" ></div>
    <div class="hamburger-bottom" ></div>
  </div>
</template>

<script>
export default {
  name: 'HamburgerIcon'
}
</script>

<style scoped>

.menu-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: all .5s ease-in-out;
  margin: 0;
  padding: 0;
}

.hamburger-mid {
  display: flex;
  width: 25px;
  height: 3px;
  margin-top: 3px;
  margin-bottom: 3px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(255,101,47,.2);
  transition: all .5s ease-in-out;
}

.hamburger-top,
.hamburger-bottom {
  content: '';
  width: 25px;
  height: 3px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(255,101,47,.2);
  transition: all .5s ease-in-out;
}

.menu-btn.open .hamburger-mid {
  transform: translateX(-50px);
  margin: 0;
  background: transparent;
  box-shadow: none;
}

.menu-btn.open .hamburger-top {
  transform: rotate(45deg) translateY(4px);
  margin-left: 5px;
}

.menu-btn.open .hamburger-bottom {
  transform: rotate(-45deg) translateY(-4px);
  margin-left: 5px;
}

</style>
