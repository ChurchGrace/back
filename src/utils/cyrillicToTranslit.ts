import cyrillicToTranslit from 'cyrillic-to-translit-js';

export const transformText = (text: string) => {
  return cyrillicToTranslit().transform(text, '-').toLowerCase();
};
