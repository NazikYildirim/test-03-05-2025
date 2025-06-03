document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errors = [];
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})(?!.*[\u0400-\u04FF])/;
  
      if (!emailRegex.test(email)) {
        errors.push('Email не містить валідну електронну адресу');
      }
  
      if (!passwordRegex.test(password)) {
        errors.push('Пароль має містити щонайменше 8 символів, одну велику букву, один спецсимвол, не містить кирилиці.');
      }
  
      const oldError = document.querySelector('.error-box');
      if (oldError) oldError.remove();

      if (errors.length > 0) {
        // alert(errors.join('\n')); 
        const errorBox = document.createElement('div');
        errorBox.className = 'error-box';
        errorBox.innerHTML = errors.join('<br>');
        const image = form.querySelector('img');
        form.insertBefore(errorBox, image.nextSibling);
        return;
      }
  
  
    form.classList.add('disabled');
        
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.innerHTML = '<i class="fas fa-spinner loader"></i>';
      form.appendChild(overlay);
  
      try {
        const response = await fetch('/form-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        const result = await response.json();
        console.log('Відповідь сервера:', result);
  
        overlay.remove();
        form.classList.remove('disabled');
  
        if (result.status === 'ok') {
          alert('Форма успішно надіслана!');
        } else {
          alert('Помилка');
        }
      } catch (error) {
        overlay.remove();
        form.classList.remove('disabled');
        alert('Сталася помилка.');
        console.error(error);
      }
    });
});
  
const Weather = () => {
    React.useEffect(() => {
      fetch("https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1")
        .then(res => res.json())
        .then(data => {
          console.log("Отримана погода:", data);
        })
        .catch(err => console.error("Помилка запиту погоди:", err));
    }, []);
  
    return React.createElement("div", null, "Компонента погоди (дані в консолі)");
  };
  
  const weatherRoot = document.getElementById("weather-root");
  if (weatherRoot) {
    ReactDOM.createRoot(weatherRoot).render(React.createElement(Weather));
  }
  