import { useForm } from 'react-hook-form';
import { useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { privacySchema } from '@/lib/schemas/account';
// import Toggle from '../../components/ui/Toggle';
// import Select from '../../components/ui/Select';
// import { toast } from '../../components/toast';

export default function Privacy() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    // resolver: zodResolver(privacySchema), // Corrigir quando schema existir
    defaultValues: {
      showFullName: 'false',
      showNeighborhood: true,
      messagesFromVerifiedOnly: true,
      shareEmailWithMatches: false,
      sharePhoneWithMatches: false,
      language: 'en',
      timezone: 'Europe/Lisbon',
    },
  });

  const onSubmit = async (formData: any) => {
    setLoading(true);
    console.log('Privacy form submitted', formData);
    // const res = await fetch('/api/account/privacy', {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    setLoading(false);
    // if (res.status === 204) {
    //   toast.success('Saved ✓');
    // } else {
    //   const err = await res.json();
    //   toast.error(err.error || 'Error');
    // }
  };

  return (
    <section aria-labelledby="privacy-heading">
      <h2 id="privacy-heading" className="text-xl font-semibold flex items-center gap-2">
        <span className="inline-block"><svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11V17M12 7V7.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9z" /></svg></span>
        Privacy
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex gap-4">
          <label>
            <input type="radio" value="false" {...form.register('showFullName')} /> Show first name + initial
          </label>
          <label>
            <input type="radio" value="true" {...form.register('showFullName')} /> Show full name
          </label>
        </div>
  {/* <Toggle label="Show neighborhood" {...form.register('showNeighborhood')} help="Your exact address stays hidden until a booking is confirmed." /> */}
  {/* <Toggle label="Messages from verified-only" {...form.register('messagesFromVerifiedOnly')} /> */}
  {/* <Toggle label="Share email with confirmed matches" {...form.register('shareEmailWithMatches')} /> */}
  {/* <Toggle label="Share phone with confirmed matches" {...form.register('sharePhoneWithMatches')} /> */}
  {/* <Select label="Language" options={[]} {...form.register('language')} /> */}
  {/* <Select label="Time zone" options={[]} {...form.register('timezone')} /> */}
        <button type="submit" className="btn btn-primary" disabled={loading || !form.formState.isDirty} aria-busy={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
      {/* Danger zone and other actions would go here */}
    </section>
  );
}
