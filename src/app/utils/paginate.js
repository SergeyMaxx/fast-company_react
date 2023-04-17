export function paginate(items, pageNumber, pageSize) {
  return [...items].splice((pageNumber - 1) * pageSize, pageSize)
}