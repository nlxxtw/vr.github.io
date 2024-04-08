function welcome() {
  let welcome_text = '欢迎光顾本网站~';
  let lastVisitTime = localStorage.getItem('lastVisitTime');
  let currentTime = new Date().getTime();
  
  if (!lastVisitTime || (currentTime - lastVisitTime > 120000)) {
    if (document.referrer !== '') {
      let referrer = document.referrer.split("/")[2];
      welcome_text = "欢迎你，来自" + referrer.toUpperCase() + "的朋友！";
      if (referrer.toUpperCase() == document.domain.toUpperCase()) return;
    }
    
    // 使用免费的IP-API来获取用户的地理位置信息
    $.getJSON("https://ipapi.co/json", function(data) {
      let country = data.country_name;
      let city = data.city;
      
      let locationInfo = country + ' ' + city;
      
      swal({
        title: " 欢迎关注公众号学习帮pro！",
        text: welcome_text + '\n欢迎来自' + locationInfo + '的用户！\n获取更多资源请扫码关注！',
        imageUrl: "https://cdn.jsdelivr.net/gh/nlxxtw/cdn@main/gzh.png",
        showConfirmButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          // 用户点击了确认按钮后执行的操作
          // 可以在这里添加需要执行的代码
          swal.close(); // 关闭弹窗
        }
      });
    });
    
    localStorage.setItem('lastVisitTime', currentTime);
  }
}

$(document).ready(() => {
  welcome();
});