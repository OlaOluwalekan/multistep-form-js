const getDOM = (elem) => {
  let item = document.querySelector(elem)
  if (item !== null) {
    return item
  }
  document.body.textContent = "no dom element is attached to the selector"
}

const getAllDOMS = (elem) => {
  let item = document.querySelectorAll(elem)
  if (item.length !== 0) {
    return item
  }
  document.body.textContent = "no dom element is attached to the selector"
}

export { getDOM, getAllDOMS }
