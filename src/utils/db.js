import Dexie from 'dexie'

const db = new Dexie('AnkipanDatabase')
export default db

db.version(1).stores({
  breads:
    '&nanoId,*userNanoId,*userId,title,image,answers,isPublic,source,license',
})

export async function setBread(bread) {
  await db.breads.put(bread)
}

export async function getBread(nanoId) {
  return await db.breads
    .where('nanoId')
    .equals(nanoId)
    .first()
}

export async function deleteBread(nanoId) {
  return await db.breads
    .where('nanoId')
    .equals(nanoId)
    .delete()
}

export async function deleteAllBread() {
  return await db.breads.clear()
}

export async function showBreadsCount() {
  const count = await db.breads.count()
  console.info(count)
}
