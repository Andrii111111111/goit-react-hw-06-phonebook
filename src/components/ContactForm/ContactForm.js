import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Form, Label, Input, Button } from './ContactForm.style.js';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsSlice.js';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+$/,
      'Name must be in the format "Name Surname"'
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      'Phone number must be in the format "xxx-xx-xx"'
    )
    .required('Phone number is required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target;

    // валидация
    ValidationSchema.validate({ name: name.value, number: number.value })
      .then(() => {
        const isNameExists = contacts.some(
          contact => contact.name.toLowerCase() === name.value.toLowerCase()
        );

        if (isNameExists) {
          alert(`${name.value} is already in Contacts`);
          return;
        }

        const newContact = {
          id: nanoid(),
          name: name.value,
          number: number.value,
        };

        dispatch(addContact(newContact));
        name.value = '';
        number.value = '';
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        name:
        <Input type="text" name="name" placeholder="name surname" required />
      </Label>
      <Label>
        phone number:
        <Input type="tel" name="number" placeholder="xxx-xx-xx" required />
      </Label>
      <Button type="submit">add contact</Button>
    </Form>
  );
};
