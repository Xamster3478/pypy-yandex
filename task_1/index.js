function decodeFields(encoded, translations) {
  // Список ключей, которые не нужно раскодировать
  const excludeKeys = ['groupId', 'service', 'formatSize', 'ca'];

  // Список для хранения уникальных id
  let uniqueIds = new Set();

  // Раскодированный список
  let decodedList = encoded.map(item => {
    let decodedItem = {};

    for (let key in item) {
      if (key.endsWith('Id') && !excludeKeys.includes(key)) {
        // Добавляем значение в список уникальных id, если оно не null и существует в translations
        if (item[key] !== null && translations.hasOwnProperty(item[key])) {
          uniqueIds.add(item[key]);
        }
        // Расшифровываем значение, если оно существует в translations
        decodedItem[key] = translations[item[key]] !== undefined ? translations[item[key]] : item[key];
      } else {
        // Сохраняем исходное значение для исключенных ключей и тех, что не заканчиваются на 'Id'
        decodedItem[key] = item[key];
      }
    }

    return decodedItem;
  });

  // Преобразуем Set в Array для вывода списка уникальных id
  uniqueIds = [...uniqueIds];

  return {
    decodedList, // Расшифрованный список
    uniqueIds, // Список уникальных id
  };
}
