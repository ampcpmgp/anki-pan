import Dexie from 'dexie'
import { SIZE } from '../../const/pager'

const db = new Dexie('AnkipanDatabase')
export default db

db.version(1).stores({
  breads:
    '&nanoId,*userNanoId,*userId,title,image,answers,isPublic,source,license',
})
db.version(2).stores({
  breads: '&nanoId,userNanoId,userId,title,answers,isPublic,source,license',
  favorites: '++,userNanoId,breadNanoId,&[userNanoId+breadNanoId]',
})
db.version(3)
  .stores({
    breads:
      '&nanoId,timestamp,userNanoId,userId,title,answers,isPublic,source,license',
    favorites: '++,userNanoId,breadNanoId,&[userNanoId+breadNanoId]',
  })
  .upgrade(trans => {
    return trans.breads.toCollection().modify(bread => {
      bread.timestamp = Date.now()
    })
  })

export function setFavorite(favorite) {
  db.favorites.put(favorite)
}

export async function existsFavorite(userNanoId, breadNanoId) {
  const count = await db.favorites
    .where('[userNanoId+breadNanoId]')
    .equals([userNanoId, breadNanoId])
    .count()

  return count === 1
}

export function deleteFavorite({ userNanoId, breadNanoId }) {
  return db.favorites
    .where('[userNanoId+breadNanoId]')
    .equals([userNanoId, breadNanoId])
    .delete()
}

export function setBread(bread) {
  db.breads.put({
    timestamp: Date.now(),
    ...bread,
  })
}

export function getBread(nanoId) {
  return db.breads
    .where('nanoId')
    .equals(nanoId)
    .first()
}

export async function getBreads(offsetFromLast) {
  return db.breads
    .orderBy('timestamp')
    .reverse()
    .offset(offsetFromLast)
    .limit(SIZE)
    .toArray()
}

export function updateBread(nanoId, bread) {
  return db.breads
    .where('nanoId')
    .equals(nanoId)
    .modify({
      timestamp: Date.now(),
      ...bread,
    })
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

export async function getBreadsCount() {
  const count = await db.breads.count()
  return count
}
