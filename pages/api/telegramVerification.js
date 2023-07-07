import fetch from 'node-fetch';

function generateVerificationCode() {
  const length = 6;
  const characters = '0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export default async function handler(req, res) {
  const { username } = req.body;
  const botToken = '5364673291:AAG-0SnlHvx4ozL5d2APGvTYpQ9-gi-3W-I';

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getChat?chat_id=@${username}`);
    const data = await response.json();
    console.log('Telegram API Response:', data);

    if (data && data.ok) {
      const chatId = data.result.id;
      console.log(`Chat ID for ${username}: ${chatId}`);

      // Send the verification code to the user's Telegram chat
      const verificationCode = generateVerificationCode();

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Your verification code: ${verificationCode}`,
        }),
      });

      res.status(200).json({ success: true });
    } else {
      console.error('Error retrieving chat ID:', data);
      res.status(500).json({ success: false, error: 'An error occurred' });
    }
  } catch (error) {
    console.error('Error retrieving chat ID:', error);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
}
