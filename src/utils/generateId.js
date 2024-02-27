//generate id for pet base on date create and pet type and pet name to make sure id is unique
//ex: Y21M10C_bot_321
//Y21M10C: year 2021, month 10, cat C, pet name bot, 321: index
function vietnameseCharacterToEnglish(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export const generatePetId = (pet) => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = date.getMonth() + 1;
  const petType = pet.type === 'cat' ? 'C' : 'D';
  const index = Math.floor(Math.random() * 1000);
  return `Y${year}M${month}${petType}_${vietnameseCharacterToEnglish(
    pet.name
  )}_${index}`;
};

//generate id for foster base on date create
//ex: fs_20211010_321

export const generateFosterId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const index = Math.floor(Math.random() * 1000);
  return `fs_${year}${month}${day}_${index}`;
};

export const generateAdoptId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const index = Math.floor(Math.random() * 1000);
  return `ad_${year}${month}${day}_${index}`;
};
