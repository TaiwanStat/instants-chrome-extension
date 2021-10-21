export function setMoment() {
  let now = window.now = new Date();
  let hours = window.hours = window.now.getHours();
  window.time = (hours >= 6 && hours < 18) ? '白天' : '晚上';
  let greeting;

  if (window.hours >= 6 && window.hours < 12) {
    greeting = '早安，';
  } 
  else if (window.hours >= 12 && window.hours < 18) {
    greeting = '午安，';
  } 
  else {
    greeting = '晚安，';
  }

  $('.nav-center').text(greeting)
}
