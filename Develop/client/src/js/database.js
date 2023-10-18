import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //create a connection to the databse and version we want to use
const jateDB = await openDB('jate', 1);
//create a transaction and object store
const tx = jateDB.transaction('jate', 'readwrite');
//add the content to the object store
const store = tx.objectStore('jate');
//put the content in the store
const request = store.put({ id: 1, value: content });

// Get confirmation of the request
const result = await request;
console.log('data saved to the database', result);
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //database and version we want to use
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('data retrieved from the database', result);
  return result;
}

initdb();
