export const usersSelection = {
  plan: {
    chosenPlan: "",
    billType: "monthly",
    planCost: function () {
      if (this.chosenPlan === "Arcade") {
        return planArr[0].price()
      } else if (this.chosenPlan === "Advanced") {
        return planArr[1].price()
      } else {
        return planArr[2].price()
      }
    },
  },
  addon: {
    name: [],
    price: [],
  },
}

export const planArr = [
  {
    name: "arcade",
    price: function () {
      if (usersSelection.plan.billType === "monthly") {
        return "9/mo"
      } else {
        return "90/yr"
      }
    },
  },
  {
    name: "advance",
    price: function () {
      if (usersSelection.plan.billType === "monthly") {
        return "12/mo"
      } else {
        return "120/yr"
      }
    },
  },
  {
    name: "pro",
    price: function () {
      if (usersSelection.plan.billType === "monthly") {
        return "15/mo"
      } else {
        return "150/yr"
      }
    },
  },
]

export const addonArr = [
  {
    name: "Online services",
    price: function () {
      if (usersSelection.plan.billType === "monthly") {
        return "1/mo"
      } else {
        return "10/yr"
      }
    },
  },
  {
    name: "Larger Storage",
    price: function () {
      if (usersSelection.plan.billType === "monthly") {
        return "2/mo"
      } else {
        return "20/yr"
      }
    },
  },
  {
    name: "Customizable profile",
    price: function () {
      if (usersSelection.plan.billType === "monthly") {
        return "2/mo"
      } else {
        return "20/yr"
      }
    },
  },
]
