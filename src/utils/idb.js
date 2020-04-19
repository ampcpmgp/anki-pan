import Dexie from 'dexie'

const db = new Dexie('AnkipanDatabase')
export default db

db.version(1).stores({
  breads:
    '&nanoId,*userNanoId,*userId,title,image,answers,isPublic,source,license',
})
db.version(2).stores({
  breads:
    '&nanoId,*userNanoId,*userId,title,image,answers,isPublic,source,license',
  favorites: '[userNanoId+breadNanoId],*userNanoId,*breadNanoId',
})

export function setFavorite(favorite) {
  db.favorites.put(favorite)
}

export function getFavorite(userNanoId, breadNanoId) {
  return db.favorites
    .where('[userNanoId+breadNanoId]')
    .equals([userNanoId, breadNanoId])
    .first()
}

export function deleteFavorite(userNanoId, breadNanoId) {
  return db.favorites
    .where('[userNanoId+breadNanoId]')
    .equals([userNanoId, breadNanoId])
    .delete()
}

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
