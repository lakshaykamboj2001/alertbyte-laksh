import { useState } from 'react';

export default function TestPage() {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleGenerateCode = async () => {
    try {
      const response = await fetch('/api/teletest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate',
          username,
        }),
      });

      const data = await response.json();
      setVerificationMessage(data.message);
    } catch (error) {
      console.error('Failed to generate verification code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch('/api/teletest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify',
          username,
          code: verificationCode,
        }),
      });

      const data = await response.json();
      setVerificationMessage(data.message);
    } catch (error) {
      console.error('Failed to verify code:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Telegram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleGenerateCode}>Generate Code</button>

      <div>
        <input
          type="text"
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button onClick={handleVerifyCode}>Verify</button>
      </div>

      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
}
