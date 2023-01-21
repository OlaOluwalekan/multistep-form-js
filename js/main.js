import { getDOM, getAllDOMS } from "./functions.js"
import { usersSelection, planArr, addonArr } from "./data.js"

const nextBtn = getDOM(".next")
const prevBtn = getDOM(".prev")
const stepNos = getAllDOMS("aside span")
const stepsContainers = getAllDOMS(".steps-container section")
const swithContainer = getDOM(".switch")
const swithBtn = getDOM(".switch-btn")
const planPriceDOM = getAllDOMS(".plan-price")
const planContainers = getAllDOMS(".plans article")
const inputs = getAllDOMS(".personal-info-container input")
const errorDOMs = getAllDOMS(".error")
const addonPriceDOM = getAllDOMS(".addon-price")
const addonContainers = getAllDOMS(".addon")
const checkImage = getAllDOMS(".addons-container img")
const summaryPlanType = getDOM(".summary-plan-name span")
const summaryPlanPrice = getDOM(".summary-plan-price")
const addOnSummary = getDOM(".summary-addon")
const totalSum = getDOM(".total-sum")
const totalWord = getDOM(".total-word span")

let currentStep = 1
const stepNoBg = "hsl(228, 100%, 84%)"
const stepNoColor = "hsl(213, 96%, 18%)"

window.onload = () => {
  toggleStepsBg()
  togglePrevStep()
  toggleStepsContainer()
  renderPlanPrice()
}

nextBtn.onclick = () => {
  switch (currentStep) {
    case 1:
      checkInputs()
      break
    case 2:
      if (usersSelection.plan.chosenPlan !== "") {
        currentStep++
      } else {
        alert("chose plan please")
      }
      break
    case 3:
      currentStep++
      console.log(usersSelection.addon.name)
      getSummary()
      nextBtn.innerHTML = "Confirm"
      break
    case 4:
      currentStep++
      break
    default:
      break
  }

  console.log(currentStep)
  togglePrevStep()
  toggleNextStep()
  toggleStepsBg()
  toggleStepsContainer()
}

prevBtn.onclick = () => {
  currentStep--
  console.log(currentStep)
  togglePrevStep()
  toggleNextStep()
  toggleStepsBg()
  toggleStepsContainer()
}

swithContainer.onclick = () => {
  swithBtn.classList.toggle("switch-is-yearly")
  if (usersSelection.plan.billType === "monthly") {
    usersSelection.plan.billType = "yearly"
  } else {
    usersSelection.plan.billType = "monthly"
  }

  console.log(usersSelection.plan.billType)
  renderPlanPrice()
  renderAddonPrice()
}

planContainers.forEach((container) => {
  const planName = container.querySelector(".plan-name").textContent
  container.onclick = () => {
    usersSelection.plan.chosenPlan = planName
    planContainers.forEach((cont) => {
      cont.style.border = "1px solid var(--CoolGray)"
    })
    container.style.border = "1px solid var(--MarineBlue)"
    console.log(usersSelection.plan.planCost())
  }
})

addonContainers.forEach((container, i) => {
  container.onclick = () => {
    container.classList.toggle("active")
    checkImage[i].classList.toggle("active")
    if (usersSelection.addon.name.includes(addonArr[i].name)) {
      let index = usersSelection.addon.name.indexOf(addonArr[i].name)
      console.log(index)
      usersSelection.addon.name.splice(index, 1)
      usersSelection.addon.price.splice(index, 1)
    } else {
      usersSelection.addon.name.push(addonArr[i].name)
      usersSelection.addon.price.push(addonArr[i].price())
    }
    console.log(usersSelection.addon.name)
    console.log(usersSelection.addon.price)
  }
})

const togglePrevStep = () => {
  if (currentStep === 1 || currentStep === 5) {
    prevBtn.style.visibility = "hidden"
  } else {
    prevBtn.style.visibility = "visible"
  }
}

const toggleNextStep = () => {
  if (currentStep === 4) {
    nextBtn.style.backgroundColor = "var(--PurplishBlue)"
    nextBtn.innerHTML = "Confirm"
  } else if (currentStep === 5) {
    nextBtn.style.visibility = "hidden"
  } else {
    nextBtn.style.backgroundColor = "var(--MarineBlue)"
    nextBtn.innerHTML = "Next step"
    nextBtn.style.visibility = "visible"
  }
}

const toggleStepsBg = () => {
  stepNos.forEach((stepNo, i) => {
    if (i === currentStep - 1) {
      stepNo.style.backgroundColor = stepNoBg
      stepNo.style.borderColor = stepNoBg
      stepNo.style.color = stepNoColor
    } else {
      stepNo.style.backgroundColor = "unset"
      stepNo.style.borderColor = "white"
      stepNo.style.color = "white"
    }
  })
}

const toggleStepsContainer = () => {
  stepsContainers.forEach((step, i) => {
    if (i === currentStep - 1) {
      step.style.display = "block"
    } else {
      step.style.display = "none"
    }
  })
}

const renderPlanPrice = () => {
  planPriceDOM.forEach((plan, i) => {
    plan.innerHTML = "$" + planArr[i].price()
  })
}

const renderAddonPrice = () => {
  addonPriceDOM.forEach((addon, i) => {
    addon.innerHTML = "$" + addonArr[i].price()
  })
}

const checkInputs = () => {
  if (inputs[0].value && inputs[1].value && inputs[2].value) {
    currentStep++
  } else {
    inputs.forEach((input, i) => {
      input.onkeyup = () => {
        if (input.value === "") {
          errorDOMs[i].innerHTML = "This field is required"
        } else {
          errorDOMs[i].innerHTML = ""
        }
      }
      if (input.value === "") {
        errorDOMs[i].innerHTML = "This field is required"
      } else {
        errorDOMs[i].innerHTML = ""
      }
    })
  }
}

const createAddonDOM = (name, price) => {
  const addonCont = document.createElement("div")
  addonCont.classList.add("addon-cont")
  const addonName = document.createElement("span")
  addonName.classList.add("summary-addon-name")
  const addonPrice = document.createElement("span")
  addonPrice.classList.add("summary-addon-price")
  addonName.innerHTML = name
  addonPrice.innerHTML = "+$" + price
  addonCont.appendChild(addonName)
  addonCont.appendChild(addonPrice)
  return addonCont
}

const calculateTotal = () => {
  let planTotal = usersSelection.plan
    .planCost()
    .substring(0, usersSelection.plan.planCost().length - 3)

  let formartedAddPrice = usersSelection.addon.price.map((item) => {
    return item.substring(0, item.length - 3)
  })

  let total = formartedAddPrice.reduce((acc, curr) => {
    acc += Number(curr)
    return acc
  }, Number(planTotal))

  return total
}

const getSummary = () => {
  summaryPlanType.innerHTML = `${usersSelection.plan.chosenPlan} (${usersSelection.plan.billType})`
  summaryPlanPrice.innerHTML = `$${usersSelection.plan.planCost()}`
  addOnSummary.innerHTML = ""
  usersSelection.addon.name.forEach((addon, i) => {
    let addons = createAddonDOM(addon, usersSelection.addon.price[i])
    addOnSummary.appendChild(addons)
  })
  const total = calculateTotal()
  totalSum.innerHTML =
    "+$" +
    total +
    `${usersSelection.plan.billType === "monthly" ? "/mo" : "/yr"}`
  totalWord.innerHTML = `(per ${
    usersSelection.plan.billType === "monthly" ? "month" : "year"
  })`
}
