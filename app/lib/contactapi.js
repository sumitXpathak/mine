const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

export const contactApi = {
  async submit(formData) {
    try {
      const resp = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        let msg = 'Failed to submit contact form';
        try {
          const err = await resp.json();
          msg = err.detail || err.message || msg;
        } catch {
          msg = `Server error: ${resp.status} ${resp.statusText}`;
        }
        throw new Error(msg);
      }

      return resp.json();
    } catch (err) {
      if (err instanceof TypeError && /Failed to fetch/i.test(err.message)) {
        throw new Error(
          'Unable to reach the server. Ensure the backend is running and CORS is configured.'
        );
      }
      throw err;
    }
  },
};

export default contactApi;
