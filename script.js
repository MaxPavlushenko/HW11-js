"use strict"

const tatiana = {
  id: '1',
  name: "Tatiana",
  email: "123@gm.com",
  address: "Belarus",
  phone: "+375291234567"

}

class User {
  constructor(user) {
    this.data = user
  }

  editUser(newUser) {
    this.data = newUser
  }

  getUser() {
    return this.data
  }
}
const user = new User(tatiana)
/*console.log(user)
console.log(user.getUser())*/

class Contacts {
  constructor() {
    this.data = []
  }
  add(user) {
    const newUser = new User(user)
    this.data = [... this.data, newUser.data]
  }

  edit(id, data) {
    const users = this.data.map(element => {
      if (element.id === id) {
        return { ...element, ...data }
      }
      return element
    })
    user.editUser.call(this, users)
  }

  remove(id) {
    return this.data = this.data.filter(element => element.id !== id)
  }

  get() {
    return this.data
  }
}

//const contacts = new Contacts()
//console.log(contacts)
//contacts.add(tatiana)
//contacts.edit('1',{name:"Max"})*/

class ContactsApp extends Contacts {
  constructor() {
    super();
    this.render()
  }
  render() {
    const form = document.querySelector('.form')
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const { elements } = form
      const contact = {}


      Array.from(elements)
        .filter(element => element.name)
        .forEach(element => {
          const { name, value } = element
          contact[name] = value

          element.value = ''

        })

      super.add(contact)
      this.createContactList()
      this.handleLocalStorage()
    })
  }
setCookie(name, value){
  const expires = new Date()
  expires.setDate(expires.getDate() + 10)
  document.cookie = `${name}=${value}; path=/; expires=${expires}`
}

handleLocalStorage(){
  if(!this.data.length){
    return localStorage.removeItem('contacts')
  }
  localStorage.setItem("contacts", JSON.stringify(this.data))
  this.setCookie('storageExpiration','true')
}

  createContactList() {
    const contacts = document.querySelector('.contacts__list')
    const list = document.createElement('div')
    list.className = 'contacts__item'
    const name = document.createElement("div")
    const email = document.createElement("div")
    const address = document.createElement("div")
    const phone = document.createElement("div")
    const buttonContainer = document.createElement("div")
    buttonContainer.className = "buttonContainer"
    const editButton = document.createElement("button")
    editButton.classList.add('contact__editButton', "button")
    editButton.innerHTML = "Edit"

    const removeButton = document.createElement("button")
    removeButton.classList.add('contact__removeButton', "button")
    removeButton.innerHTML = "Remove"

    buttonContainer.append(editButton, removeButton)

    list.append(name, email, address, phone, buttonContainer)
    contacts.append(list)

    this.data.find((element) => {
      name.innerHTML = element.name
      email.innerHTML = element.email
      address.innerHTML = element.address
      phone.innerHTML = element.phone
   
  })
    editButton.addEventListener("click", event => {
      event.preventDefault()
      const parent = removeButton.closest(".contacts__item")
			const editContact = {}
			name.innerHTML = editContact.name =
				prompt("Enter name:") || name.textContent
			email.innerHTML = editContact.email =
				prompt("Enter email:") || email.textContent
			address.innerHTML = editContact.address =
				prompt("Enter address:") || address.textContent
			phone.innerHTML = editContact.phone =
				prompt("Enter phone:") || phone.textContent

			super.edit(+parent.id, editContact)
      this.handleLocalStorage()
    })
    removeButton.addEventListener("click", (event) => {
			event.preventDefault()
			const parent = removeButton.parentElement.parentElement
			super.remove(+parent.id)
			parent.remove()
      this.handleLocalStorage()
	
		})
 
    
  }
}

    const contactsApp = new ContactsApp()
    console.log(contactsApp)

