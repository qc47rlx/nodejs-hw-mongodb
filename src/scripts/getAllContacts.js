import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

export const getAllContacts = async () => {
  const rez = await fs.readFile(PATH_DB, {
    encoding: 'utf8',
  });
  return JSON.parse(rez);
};

getAllContacts()
  // .then((data) => JSON.parse(data, undefined, 2))

  .then((data) => data)
  .catch((error) => console.error(error));

console.log(await getAllContacts());
