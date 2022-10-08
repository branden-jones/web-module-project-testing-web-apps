import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';


test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name/i);
    const inputValue = 'abc'
    userEvent.type(firstNameInput, inputValue);

    await waitFor(() => {
        const errorNameFeedback = screen.queryByText(/must have at least 5 characters/i);
        expect(errorNameFeedback).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button')
    const inputValue = ''

    userEvent.type(firstNameInput, inputValue);
    userEvent.type(lastNameInput, inputValue);
    userEvent.type(emailInput, inputValue);
    userEvent.click(submitButton);


    const firstNameError = screen.queryByText(/must have at least 5 characters/i);
    const lastNameError = screen.queryByText(/is a required field/i);
    const emailError = screen.queryByText(/must be a valid email/i);

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button')
    const goodInputValue = 'abcdef@.com';
    const badInputValue = '';

    userEvent.type(firstNameInput, goodInputValue);
    userEvent.type(lastNameInput, goodInputValue);
    userEvent.type(emailInput, badInputValue);
    userEvent.click(submitButton);

    const emailError = screen.queryByText(/must be a valid email/i);

    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button');
    const inputValue = '@.';

    userEvent.type(emailInput, inputValue);
    userEvent.click(submitButton);
    
    const emailError = screen.queryByText(/must be a valid email/i);
    expect(emailError).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const lastNameInput = screen.getByText(/last name/i);
    const  submitButton = screen.getByRole('button');
    const inputValue = '';
    
    userEvent.type(lastNameInput, inputValue);
    userEvent.click(submitButton);

    const lastNameError = screen.queryByText(/is a required field/i);
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const submitButton = screen.getByRole('button')
    const inputValue = 'abcd'

    userEvent.type(firstNameInput, inputValue);
    userEvent.click(submitButton);

    const firstNameError = screen.queryByText(/must have at least 5 characters/i);
    expect(firstNameError).toBeInTheDocument();
     
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByText(/first name/i);
    const lastNameInput = screen.getByText(/last name/i);
    const emailInput = screen.getByText(/email/i);
    const messageInput = screen.getByText(/message/i);
    const submitButton = screen.getByRole('button');

    const firstText = 'Branden';
    const lastText = 'Jones';
    const emailText = 'me@me.me';
    const message = 'you...i guess';

    userEvent.type(firstNameInput, firstText);
    userEvent.type(lastNameInput, lastText);
    userEvent.type(emailInput, emailText);
    userEvent.type(messageInput, message);
    userEvent.click(submitButton);

    const successFirstName = screen.getByTestId('firstnameDisplay')
    const successLastName = screen.getByTestId('lastnameDisplay')
    const successEmail = screen.getByTestId('emailDisplay')
    const successMessage = screen.getByTestId('messageDisplay')

    expect(successFirstName).toBeInTheDocument();
    expect(successLastName).toBeInTheDocument();
    expect(successEmail).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();

});
