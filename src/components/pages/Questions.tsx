import React from 'react';

export function Questions() {
  const handleSubmitForm = () => {
    console.log('submitted');
  };

  return <form onSubmit={handleSubmitForm}>form</form>;
}
