import crypto from 'node:crypto';

const CAPTCHA_TTL_MS = 5 * 60 * 1000;
const captchaStore = new Map();

// Limpieza periodica para evitar crecimiento de memoria con captchas expirados.
setInterval(() => {
  const now = Date.now();
  for (const [id, captcha] of captchaStore.entries()) {
    if (captcha.expiresAt <= now) {
      captchaStore.delete(id);
    }
  }
}, 60 * 1000).unref();

const buildMathCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const useSum = Math.random() > 0.5;

  if (useSum) {
    return {
      question: `Cuanto es ${a} + ${b}?`,
      answer: String(a + b)
    };
  }

  const max = Math.max(a, b);
  const min = Math.min(a, b);
  return {
    question: `Cuanto es ${max} - ${min}?`,
    answer: String(max - min)
  };
};

const generateCaptcha = (req, res) => {
  const { question, answer } = buildMathCaptcha();
  const captchaId = crypto.randomUUID();
  const expiresAt = Date.now() + CAPTCHA_TTL_MS;

  captchaStore.set(captchaId, {
    answer,
    expiresAt
  });

  res.status(200).json({
    captchaId,
    question,
    expiresAt
  });
};

const verifyCaptcha = (req, res) => {
  const { captchaId, answer } = req.body;

  if (!captchaId || answer === undefined || answer === null) {
    return res.status(400).json({
      ok: false,
      message: 'captchaId y answer son requeridos'
    });
  }

  const savedCaptcha = captchaStore.get(captchaId);

  if (!savedCaptcha) {
    return res.status(400).json({
      ok: false,
      message: 'Captcha invalido o ya usado'
    });
  }

  if (savedCaptcha.expiresAt <= Date.now()) {
    captchaStore.delete(captchaId);
    return res.status(400).json({
      ok: false,
      message: 'Captcha expirado'
    });
  }

  const isValid = savedCaptcha.answer === String(answer).trim();

  captchaStore.delete(captchaId);

  if (!isValid) {
    return res.status(400).json({
      ok: false,
      message: 'Respuesta incorrecta'
    });
  }

  return res.status(200).json({
    ok: true,
    message: 'Captcha validado'
  });
};

export { generateCaptcha, verifyCaptcha };