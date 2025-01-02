import { useForm } from 'react-hook-form';

// Add your SendGrid API key here

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log('Form submission started with data:', data);
    
    try {
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/send-email'
        : 'http://localhost:3001/api/send-email';

      console.log('Sending request to:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response received:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('Email sent successfully');
        alert('Message sent successfully!');
        reset();
      } else {
        throw new Error(responseData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Na Kontaktoni</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Do të na pëlqente të dëgjojmë nga ju. Dërgoni një mesazh dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Emri
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email-i
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span className="text-red-500 text-sm">Please enter a valid email</span>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                Mesazhi
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.message && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Dergo Mesazhin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}