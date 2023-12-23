import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Input, Button } from './ContactForm.style';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

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
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = useSelector(state => state.contacts.contacts);
  console.log(onSubmit);
  const handleChange = input => {
    switch (input.name) {
      case 'name':
        setName(input.value);
        break;
      case 'number':
        setNumber(input.value);
        break;
      default:
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setName('');
    setNumber('');
    // const { name, number } = this.state;

    // Валідація
    ValidationSchema.validate({ name, number })
      .then(() => {
        if (this.props.isNameAlreadyExists(name)) {
          alert(`${name} is already in Contacts`);
          return;
        }

        const newContact = {
          id: nanoid(),
          name,
          number,
        };

        onSubmit(newContact);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name Surname"
          required
        />
      </Label>
      <Label>
        Phone Number:
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="xxx-xx-xx"
          required
        />
      </Label>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};
