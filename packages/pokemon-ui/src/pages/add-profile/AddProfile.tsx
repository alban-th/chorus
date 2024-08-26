import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Profile } from '../../types';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';

const postProfile = async (profile: Pick<Profile, 'name'>) => {
  const response = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(profile),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message);
  }
  return await response.json();
};

const Title = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;
  padding-left: 0.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  width: fit-content;
  margin-bottom: 1rem;
`;
const Input = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;

  @media (min-width: 800px) {
    width: 50%;
  }
`;

const Submit = styled.button`
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;
  margin: 0;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  @media (min-width: 800px) {
    width: 50%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 0;
`;
  

export function AddProfile() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postProfile,
    onSuccess: (profile) => {
      // Invalidate and refetch
      setError(null);
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      navigate(`/team-editor/${profile.id}`);
    },
    onError(error) {
      setError(
        error.message.includes('duplicate')
          ? 'Name already exist, please pick another one.'
          : error.message
      );
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
      <Title>Add Profile</Title>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <FormField>
              <Label htmlFor={field.name}>Trainner's name</Label>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Input
                name={field.name}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ash Ketchum"
              />
            </FormField>
          )}
        />

        <Submit type="submit">Submit</Submit>
      </Form>
    </div>
  );
}
