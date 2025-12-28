onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  var msnry = new Masonry(grid, { percentPosition: 'true' });

//menu desktop/phone mode
const menuEffect = () => {
  console.log('menuEffect');
  const menuNav = document.querySelector('nav.navbar');
  const isDesktopMode = getComputedStyle(menuNav.querySelector('button')).getPropertyValue('display') === 'none';

  if (isDesktopMode && scrollY < 500) menuNav.classList.add('init');
  else menuNav.classList.remove('init');
}


onresice = () => menuEffect(); //視窗改變時偵測
onscroll = () => menuEffect(); //捲動時偵測
menuEffect();

// AOS 動畫初始化
AOS.init();
}