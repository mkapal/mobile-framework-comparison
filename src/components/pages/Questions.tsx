import React from 'react';

import { PageLayout } from '../PageLayout';

export function Questions() {
  const handleSubmitForm = () => {
    console.log('submitted');
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmitForm}>form</form>
    </PageLayout>
  );
}
