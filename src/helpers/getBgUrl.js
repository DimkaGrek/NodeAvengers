export const getBgUrls = bg => {
  const baseBgUrl =
    'https://raw.githubusercontent.com/DimkaGrek/NodeAvengers/main/src/assets/images/board-backgrounds/';

  return [
    `${baseBgUrl}${bg}_desk%401x.webp`,
    `${baseBgUrl}${bg}_desk%402x.webp`,
    `${baseBgUrl}${bg}_tab%401x.webp`,
    `${baseBgUrl}${bg}_tab%402x.webp`,
    `${baseBgUrl}${bg}_mob%401x.webp`,
    `${baseBgUrl}${bg}_mob%402x.webp`,
  ];
};
