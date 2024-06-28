import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Contact from './Contact';

test('renders the contact form', () => {
  render(<Contact />);
  expect(screen.getByText('Contact Us')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter subject')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
  expect(screen.getByText('Send Message')).toBeInTheDocument();
});

test('validates form inputs', () => {
  render(<Contact />);
  const nameInput = screen.getByPlaceholderText('Enter your full name');
  const emailInput = screen.getByPlaceholderText('Enter your email');
  const phoneInput = screen.getByPlaceholderText('Enter your phone number');
  const subjectInput = screen.getByPlaceholderText('Enter subject');
  const messageInput = screen.getByPlaceholderText('Enter your message');
  const submitButton = screen.getByText('Send Message');

  fireEvent.change(nameInput, { target: { value: '' } });
  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.change(phoneInput, { target: { value: '' } });
  fireEvent.change(subjectInput, { target: { value: '' } });
  fireEvent.change(messageInput, { target: { value: '' } });
  fireEvent.click(submitButton);

  expect(screen.getByText('Message sent successfully!')).not.toBeInTheDocument();
  expect(screen.getByText('Failed to send message. Please try again later.')).not.toBeInTheDocument();
});

test('handles successful form submission', async () => {
  // Mock emailjs.sendForm method
  jest.mock('@emailjs/browser', () => ({
    sendForm: jest.fn().mockResolvedValue({}),
  }));

  render(<Contact />);
  const nameInput = screen.getByPlaceholderText('Enter your full name');
  const emailInput = screen.getByPlaceholderText('Enter your email');
  const phoneInput = screen.getByPlaceholderText('Enter your phone number');
  const subjectInput = screen.getByPlaceholderText('Enter subject');
  const messageInput = screen.getByPlaceholderText('Enter your message');
  const submitButton = screen.getByText('Send Message');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(phoneInput, { target: { value: '+123456789' } });
  fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
  fireEvent.change(messageInput, { target: { value: 'Test message' } });
  fireEvent.click(submitButton);

  await screen.findByText('Message sent successfully!');
  expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
});

test('handles failed form submission', async () => {
  // Mock emailjs.sendForm method
  jest.mock('@emailjs/browser', () => ({
    sendForm: jest.fn().mockRejectedValue(new Error('Failed to send')),
  }));

  render(<Contact />);
  const nameInput = screen.getByPlaceholderText('Enter your full name');
  const emailInput = screen.getByPlaceholderText('Enter your email');
  const phoneInput = screen.getByPlaceholderText('Enter your phone number');
  const subjectInput = screen.getByPlaceholderText('Enter subject');
  const messageInput = screen.getByPlaceholderText('Enter your message');
  const submitButton = screen.getByText('Send Message');

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(phoneInput, { target: { value: '+123456789' } });
  fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
  fireEvent.change(messageInput, { target: { value: 'Test message' } });
  fireEvent.click(submitButton);

  await screen.findByText('Failed to send message. Please try again later.');
  expect(screen.getByText('Failed to send message. Please try again later.')).toBeInTheDocument();
});
