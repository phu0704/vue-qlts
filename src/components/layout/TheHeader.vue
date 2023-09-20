<template lang="">
      <header class="header">
        <div class="header__container">
          <div class="header__container--content">
            <p>Danh sách tài sản</p>
          </div>
          <div class="header__container--right">
            <p>Sở tài chính</p>
            <div class="input-FD">
              <span>Năm</span>
              <span class="input-FD__year">2023</span>
              <div class="input-FD__icon">
                <img
                  src="../../assets/icon/main/icon_navigation_arrow_top.svg"
                  alt=""
                />
                <img
                  src="../../assets/icon/main/icon_navigation_arrow_down.svg"
                  alt=""
                />
              </div>
            </div>
            <img src="../../assets/icon/main/Bell.svg" alt="" />
            <img src="../../assets/icon/main/HeThong.svg" alt="" />
            <img src="../../assets/icon/main/HoTro.svg" alt="" />
            <img src="../../assets/icon/main/User.svg" alt="" />
            <img
              src="../../assets/icon/main/icon_navigation_arrow_down.svg"
              alt=""
            />
          </div>
        </div>
      </header>
  </template>
  <script>
  export default {
    name: "TheHeader",
  };
  </script>
  <style scoped>
  .header {
    background-color: #ffffff;
    /* width: 100%; */
    /* width: calc(100vw - 132px); */
    height: 45px;
    height: 70px;
    padding: 0 19px;
    box-sizing: border-box;
  }
  .header__container {
    display: flex;
    justify-content: space-between;
  }
  .header__container--content p {
    font-weight: 700;
    font-size: 19px;
    font-size: 24px;
  }
  .header__container--right {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 19px;
  }
  </style>
  