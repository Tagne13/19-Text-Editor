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
export const putDb = async (id, content) => {
  console.error('PUT to the database');
  // Database and version
  const jateDb = await openDB('jate', 1);
  // New transaction specifying database and privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open desired object store
  const store = tx.objectStore('jate');
  // Pass in content 
  const request = store.put({ id: id, jate: content });
  // Confirmation
  const result = await request;
  console.log('Data saved to the database', result);
}; 


// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.error('GET all from the database');
  // Database and version
  const jateDb = await openDB('jate', 1);
  // New transaction specifying database and privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // Open desired object store
  const store = tx.objectStore('jate');
   // Pass in content
  const request = store.getAll();
  // Confirmation
  const result = await request;
  console.log('result.value', result);
};  

initdb();