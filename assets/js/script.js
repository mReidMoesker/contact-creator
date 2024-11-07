'use strict';

const { log } = console;

class Contact {
  #username = '';
  #email = '';
  #address = '';
    
  constructor(username, email, address) {
    this.username = username;
    this.email = email;
    this.address = address;
  }

  set username(value) {
    if (typeof value === 'string' && value.trim() !== '') {
      this.#username = value;
    } else {
      throw new Error('Invalid name');
    }
  }

  get username() {
    return this.#username;
  }

  set email(value) {
    // Email validation (I did not make this pattern myself, I found it online on a forum)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailPattern.test(value)) {
      this.#email = value;
    } else {
      throw new Error('Improper email address');
    }
  }

  get email() {
    return this.#email;
  }

  set address(value) {
    if (typeof value === 'string' && value.trim() !== '') {
      this.#address = value;
    } else {
      throw new Error('Address does not exist');
    }
  }

  get address() {
    return this.#address;
  }
}

const contacts = [];
const contactList = document.getElementById('contact-list'); 

let usernameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let addressInput = document.getElementById('address');

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  try {
    if (usernameInput.value.trim() === '' || emailInput.value.trim() === '' || addressInput.value.trim() === '') {
      addressInput.classList.add('input-error');
      addressInput.focus();
      return;
    }

    const contact = new Contact(
      usernameInput.value, 
      emailInput.value, 
      addressInput.value
    );

    contacts.push(contact);

    listContacts(contact);

    usernameInput.value = '';
    emailInput.value = '';
    addressInput.value = '';
  } catch (error) {
    usernameInput.focus();
  }
});

function listContacts(contact) {
  
  const contactElement = document.createElement('div');
  contactElement.classList.add('contact');

  const writeName = document.createElement('p');
  writeName.textContent = `Name: ${contact.username}`;
  contactElement.appendChild(writeName);

  const writeEmail = document.createElement('p');
  writeEmail.textContent = `Email: ${contact.email}`;
  contactElement.appendChild(writeEmail);

  const writeAddress = document.createElement('p');
  writeAddress.textContent = `Address: ${contact.address}`;
  contactElement.appendChild(writeAddress);
  // I can't remember if we learned appendChild in class or not, but I read about it a few years ago
  // I'm not sure how I remember it, but the book was called "Get Coding!" and I read it at 15 years

  contactElement.addEventListener('click', function() {
    contactElement.remove();
    const index = contacts.indexOf(contact);
  
    if (index > -1) {
      contacts.splice(index, 1);
    }
  });

  contactList.prepend(contactElement); // This moves new contacts to the top of the list
}
