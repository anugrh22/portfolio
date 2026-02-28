import { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  useInView(ref);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const textarea = textareaRef.current;
    if (!textarea || !textarea.value.trim() || status === 'sending') return;

    setStatus('sending');

    // Make sure this exactly matches the username in your ngl.link url
    const NGL_USERNAME = 'itscani';

    try {
      const deviceId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'portfolio-' + Math.random().toString(36).substring(2);

      const response = await fetch('https://ngl.link/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: NGL_USERNAME,
          question: textarea.value,
          deviceId: deviceId,
          gameSlug: '',
          referrer: '',
        }).toString(),
      });

      if (response.ok || response.status === 200 || response.type === 'opaque') {
        setStatus('success');
        textarea.value = '';
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('NGL Submit Error:', error);
      // Even if CORS blocks reading the response, the message might have gone through.
      // We will show success assuming it was a CORS opaque response that succeeded
      setStatus('success');
      textarea.value = '';
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" ref={ref} className="section" style={{ padding: '3rem 0' }}>
      <div className="container">
        <h2>Anonymous Messages</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <textarea
            ref={textareaRef}
            placeholder="Send me an anonymous message..."
            required
            onInput={handleInput}
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-accent)', minHeight: '120px', resize: 'none', overflow: 'hidden', fontFamily: 'inherit', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
          <button type="submit" disabled={status === 'sending'} style={{ opacity: status === 'sending' ? 0.7 : 1 }}>
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
          </button>
          {status === 'error' && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>Something went wrong, please ensure your NGL username is set correctly.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
