function randomArray(length) {
  const array = []
  for (let i = 0; i < length; i += 1) {
    array.push(i)
  }

  let currentIndex = array.length
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    const tmpArray = [...array]

    array[currentIndex] = tmpArray[randomIndex]
    array[randomIndex] = tmpArray[currentIndex]
  }

  return array
}

export default randomArray
