<!-- FOOTER -->
<script></script>

<template>
  <footer>
    <div class="footer-column">
      <div class="footer-title">Suivez-nous</div>
      <div class="social-icons">
        <div class="social-icon">in</div>
        <div class="social-icon">f</div>
        <div class="social-icon">ig</div>
      </div>
    </div>

    <div class="footer-center">© Vibe</div>

    <div class="footer-column">
      <div class="footer-title"><a href="#">Contact</a></div>
      <div>
        <a href="mailto:vincent.panzeta@eduvaud.ch">vincent.panzeta@eduvaud.ch</a>
      </div>
      <div>+41.7x.xxx.xx.xx</div>
    </div>
  </footer>
</template>

<style scoped="">
footer {
  margin-top: 25px;
  border-top: 2px solid #0172c5;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 12px;
  position: fixed;
  bottom: 0;
}
 
.footer-column {
  min-width: 150px;
}
 
.footer-title {
  font-weight: 600;
  margin-bottom: 6px;
}
 
.social-icons {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}
 
.social-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
 
.footer-center {
  text-align: center;
  align-self: center;
  font-size: 16px;
}
 
a {
  color: inherit;
  text-decoration: none;
}
</style>
