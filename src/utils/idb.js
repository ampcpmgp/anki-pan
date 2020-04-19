import Dexie from 'dexie'

const db = new Dexie('AnkipanDatabase')
export default db

db.version(1).stores({
  breads:
    '&nanoId,*userNanoId,*userId,title,image,answers,isPublic,source,license',
})

export function setBread(bread) {
  db.breads.put(bread)
}

export function getBread(nanoId) {
  return db.breads
    .where('nanoId')
    .equals(nanoId)
    .first()
}

export function updateBread(nanoId, bread) {
  return db.breads
    .where('nanoId')
    .equals(nanoId)
    .modify(bread)
}

export function deleteBread(nanoId) {
  return db.breads
    .where('nanoId')
    .equals(nanoId)
    .delete()
}

export function deleteAllBread() {
  return db.breads.clear()
}

export async function showBreadsCount() {
  const count = await db.breads.count()
  console.info(count)
}
