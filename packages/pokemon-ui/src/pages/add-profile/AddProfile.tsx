import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Profile } from '../../types';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const postProfile = async (profile: Pick<Profile, 'name'>) => {
  const response = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(profile),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message);
  }
  return await response.json();
};

export function AddProfile() {
    const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postProfile,
    onSuccess: (data) => {
      // Invalidate and refetch
      setError(null);
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
      navigate('/edit-profile/' + data.id);
    },
    onError(error) {
        setError(error.message);
    },
  });
  const form = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <div>
      <h1>Add Profile</h1>
      {error && <div>{error}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="name"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
