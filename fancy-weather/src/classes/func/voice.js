export default class VoiceSearch {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    document.querySelector('button').addEventListener('click', () => {
      const recogLang = document.querySelector('[name=lang]:checked');
      recognition.lang = recogLang.value;
      recognition.start();
    });

    recognition.addEventListener('speechstart', () => {
      log.textContent = 'Speech has been detected.';
    });

    recognition.addEventListener('result', (e) => {
      log.textContent = 'Result has been detected.';

      const last = e.results.length - 1;
      const text = e.results[last][0].transcript;

      output.textContent = text;

      log.textContent = `Confidence: ${  e.results[0][0].confidence}`;
    });

    recognition.addEventListener('speechend', () => {
      recognition.stop();
    });

    recognition.addEventListener('error', (e) => {
      output.textContent = `Error: ${  e.error}`;
    });
  }
}
