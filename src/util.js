export function getRedirectPath ({type, avatar}) {
  // 根据用户的各种信息来跳转到各个地址
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }

  return url
}

export function getChatId (userId, targetId) {
  return [userId, targetId].sort().join('_')
}

export var cookie = {
  init : function(){
    return this;
  },
  setCookie : function(name, value, day){
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + oDate;
    return this;
  },
  removeCookie : function(name){
    this.setCookie(name, "", -1);
    return this;
  },
  getCookie : function(name){
    var allCookie = document.cookie.split("; ");
    for(var i = 0; i < allCookie.length; i++){
      var arr = allCookie[i].split("=");
      if (arr[0] === name) {
        return arr[1];
      }
    }
  }
}