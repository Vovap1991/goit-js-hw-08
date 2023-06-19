import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackStateKey = 'feedback-form-state';

const saveFormState = throttle(() => {
  const feedbackState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(feedbackStateKey, JSON.stringify(feedbackState));
}, 500);

function fillFormFromState() {
  const feedbackState = JSON.parse(localStorage.getItem(feedbackStateKey));
  if (feedbackState) {
    emailInput.value = feedbackState.email;
    messageInput.value = feedbackState.message;
  } else {
    emailInput.value = '';
    messageInput.value = '';
  }
}

fillFormFromState();

form.addEventListener('input', saveFormState);

form.addEventListener('submit', event => {
  event.preventDefault();
  const feedbackState = {
    email: '',
    message: '',
  };
  localStorage.setItem(feedbackStateKey, JSON.stringify(feedbackState));
  console.log(feedbackState);
  emailInput.value = '';
  messageInput.value = '';
});
